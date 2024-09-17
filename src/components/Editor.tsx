import * as MonacoEditor from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import * as React from "react";
import { createHighlighter } from "shiki";

function Editor(props: {
  defaultValue?: string;
  evalTriggerRef: React.MutableRefObject<HTMLButtonElement | null>;
}) {
  const { defaultValue = "// ..." } = props;

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
          eval(editorRef.current.getValue());
        }
      };
      evalTrigger.addEventListener("click", handler);
      return () => {
        evalTrigger.removeEventListener("click", handler);
      };
    }
  }, [props.evalTriggerRef]);

  return (
    <MonacoEditor.Editor
      defaultLanguage="javascript"
      defaultValue={defaultValue}
      beforeMount={beforeMount}
      onMount={onMount}
      options={{ minimap: { enabled: false }, fontSize: 14, tabSize: 2 }}
    />
  );
}

export default Editor;
