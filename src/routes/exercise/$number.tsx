import React from "react";
import { json, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import Editor from "../../components/Editor";
import Stage from "../../components/Stage";
import data from "../../data.yaml";

export async function loader(args: LoaderFunctionArgs) {
  const { params } = args;
  const number = Number.parseInt(params.number as string);
  const exercise = data.exercises[number - 1];

  return json({ exercise });
}

function Exercise() {
  const evalTriggerRef = React.useRef<HTMLButtonElement | null>(null);
  const resetTriggerRef = React.useRef<HTMLButtonElement | null>(null);

  const loaderData = useLoaderData() as {
    exercise: { content: string; default?: string, grid: string, start?: string };
  };

  return (
    <>
      <div className="w-full flex flex-col h-dvh bg-white">
        <div className="h-1/2 flex gap-[1px]">
          <Stage
            type="preview"
            grid={loaderData.exercise.grid}
            content={loaderData.exercise.content}
          />
          <Stage
            type="canvas"
            grid={loaderData.exercise.grid}
            resetTriggerRef={resetTriggerRef}
            content={loaderData.exercise.start}
          />
          <div className="absolute top-0 right-0 m-4 flex gap-2">
            <button
              ref={evalTriggerRef}
              className="py-2 px-4 bg-slate-500 hover:bg-slate-600 active:bg-slate-700 pointer rounded"
            >
              Run
            </button>
            <button
              ref={resetTriggerRef}
              className="py-2 px-4 bg-slate-500 hover:bg-slate-600 active:bg-slate-700 pointer rounded"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="h-1/2 pt-4 border-t bg-zinc-900">
          <Editor
            defaultValue={loaderData.exercise.default}
            evalTriggerRef={evalTriggerRef}
          />
        </div>
      </div>
    </>
  );
}

export default Exercise;
