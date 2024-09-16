import * as React from "react";
import Editor, { Monaco, OnChange, OnMount } from "@monaco-editor/react";
import { createHighlighter } from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";
import { Outlet } from "react-router-dom";

function App() {
  const editorRef = React.useRef<Parameters<OnMount>[0] | null>(null);

  const beforeMount = async (monaco: Monaco) => {
    monaco.languages.register({ id: "javascript" });
    const highlighter = await createHighlighter({
      themes: ["github-dark"],
      langs: ["javascript"],
    });

    shikiToMonaco(highlighter, monaco);
  };

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const onChange: OnChange = (value) => {
    if (typeof value === "string") {
      try {
        eval(value);
      } catch (error) {}
    }
  };

  return (
    <div className="w-full flex flex-col h-dvh bg-zinc-900">
      <div className="h-1/2 text-white flex items-center justify-center bg-neutral-900">
        <Outlet />
      </div>
      <div className="h-1/2 pt-4 px-4 ">
        <Editor
          defaultLanguage="javascript"
          defaultValue="// Type here..."
          beforeMount={beforeMount}
          onMount={onMount}
          onChange={onChange}
          options={{ minimap: { enabled: false }, fontSize: 18 }}
        />
      </div>
    </div>
  );
}

export default App;
