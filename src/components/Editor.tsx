import * as MonacoEditor from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import * as React from "react";
import { createHighlighter } from "shiki";
import { assert } from "chai";

function evaluate(code: string) {
  try {
    eval(code);
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function test(expect: string[]) {
  try {
    const blocks = document.querySelectorAll("div.block") as NodeListOf<HTMLDivElement>;
    const current = Array.from(blocks).map((block) => block.style.backgroundColor);
    assert.deepEqual(expect, current);
    return null;
  } catch (error) {
    console.error(error);
    return error as Error;
  }
}

function Editor(props: {
  defaultValue?: string;
  evalTriggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  expect?: string[];
}) {
  const { defaultValue = "// ..." } = props;

  const [testErrorMessage, setTestErrorMessage] = React.useState<string | null>(
    null
  );
  const editorRef = React.useRef<Parameters<MonacoEditor.OnMount>[0] | null>(
    null
  );

  const beforeMount = async (monaco: MonacoEditor.Monaco) => {
    monaco.languages.register({ id: "javascript" });
    const highlighter = await createHighlighter({
      themes: ["github-dark"],
      langs: ["javascript"],
    });

    shikiToMonaco(highlighter, monaco);
  };

  const onMount: MonacoEditor.OnMount = (editor) => {
    editorRef.current = editor;
  };

  React.useEffect(() => {
    const evalTrigger = props.evalTriggerRef.current;

    if (evalTrigger !== null) {
      const handler = () => {
        if (editorRef.current !== null) {
          const evaluationError = evaluate(editorRef.current.getValue());
          if (evaluationError !== null) {
            console.error(evaluationError);
          } else if (Array.isArray(props.expect)) {
            const testError = test(props.expect);
            if (testError !== null) {
              setTestErrorMessage(testError.message);
            } else {
              setTestErrorMessage(null);
            }
          }
        }
      };
      evalTrigger.addEventListener("click", handler);
      return () => {
        evalTrigger.removeEventListener("click", handler);
      };
    }
  }, [props.evalTriggerRef]);

  return (
    <div className="h-full">
      <MonacoEditor.Editor
        height={"calc(100% - 1rem)"}
        defaultLanguage="javascript"
        defaultValue={defaultValue}
        beforeMount={beforeMount}
        onMount={onMount}
        options={{ minimap: { enabled: false }, fontSize: 14, tabSize: 2 }}
      />
      {testErrorMessage !== null && (
        <div className="flex justify-end items-center h-4 bg-red-500 px-2 text-white text-[0.625rem]">
        <span className=" line-clamp-1">
          {testErrorMessage}
        </span>
        </div>
      )}
    </div>
  );
}

export default Editor;
