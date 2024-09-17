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
    exercise: {
      name: string;
      expect: string[];
      description?: string;
      width: number; height: number;
      start?: string[];
      test?: { expect: string; getCurrent: string };
    };
  };

  return (
    <>
      <div className="w-full flex flex-col h-dvh bg-white">
        <div className="h-1/2 flex gap-[1px]">
          <Stage
            type="expect"
            width={loaderData.exercise.width}
            height={loaderData.exercise.height}
            sequence={loaderData.exercise.expect}
          />
          <Stage
            type="canvas"
            width={loaderData.exercise.width}
            height={loaderData.exercise.height}
            resetTriggerRef={resetTriggerRef}
            sequence={loaderData.exercise.start}
          />
          <div className="absolute w-full top-0 left-0 p-4 flex justify-between">
            <div className="flex items-center">
              <h1 className="text-lg text-gray-300 font-mono">
                {loaderData.exercise.name}
              </h1>
            </div>
            <div className="flex gap-2">
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
        </div>
        <div className="h-1/2 pt-4 border-t bg-zinc-900">
          <Editor
            defaultValue={loaderData.exercise.description}
            evalTriggerRef={evalTriggerRef}
            expect={loaderData.exercise.expect}
          />
        </div>
      </div>
    </>
  );
}

export default Exercise;
