import classNames from "classnames";
import React from "react";

function Stage(props: {
  type: "expect" | "canvas";
  sequence?: string[];
  resetTriggerRef?: React.MutableRefObject<HTMLButtonElement | null>;
  width: number;
  height: number;
}) {
  const { sequence = [], width, height } = props;
  const [, setState] = React.useState({});

  React.useEffect(() => {
    if (
      props.type === "canvas" &&
      typeof props.resetTriggerRef !== "undefined"
    ) {
      const resetTrigger = props.resetTriggerRef.current;

      if (resetTrigger !== null) {
        const handler = () => {
          setState({});
        };
        resetTrigger.addEventListener("click", handler);
        return () => {
          resetTrigger.removeEventListener("click", handler);
        };
      }
    }
  }, [props.resetTriggerRef]);

  const Container = (props: { children: React.ReactNode }) => {
    return (
      <div className="w-1/2 bg-zinc-900 flex justify-center items-center">
        {props.children}
      </div>
    );
  };

  const classes = classNames(
    "grid",
    width === 1 ? "w-5 grid-cols-1" : "",
    height === 1 ? "h-5 grid-rows-1" : "",
    width === 2 ? "w-10 grid-cols-2" : "",
    height === 2 ? "h-10 grid-rows-2" : "",
    width === 3 ? "w-15 grid-cols-3" : "",
    height === 3 ? "h-15 grid-rows-3" : "",
    width === 4 ? "w-20 grid-cols-4" : "",
    height === 4 ? "h-20 grid-rows-4" : "",
    width === 5 ? "w-25 grid-cols-5" : "",
    height === 5 ? "h-25 grid-rows-5" : "",
    width === 6 ? "w-30 grid-cols-6" : "",
    height === 6 ? "h-30 grid-rows-6" : "",
    width === 7 ? "w-35 grid-cols-7" : "",
    height === 7 ? "h-35 grid-rows-7" : "",
    width === 8 ? "w-40 grid-cols-8" : "",
    height === 8 ? "h-40 grid-rows-8" : ""
  );

  const items = Array.from({ length: width * height }, (_, index) => {
    return sequence[index % sequence.length];
  });

  if (props.type === "canvas") {
    const Comp = () => {
      return (
        <Container>
          <div id={props.type} className={classes}>
            {items.map((value, index) => (
              <div
                id={`block-${index}`}
                key={`block-${index}`}
                className="block"
                style={{ backgroundColor: value }}
              ></div>
            ))}
          </div>
        </Container>
      );
    };

    return <Comp />;
  }

  return (
    <Container>
      <div id={props.type} className={classes}>
        {items.map((value, index) => (
          <div
            key={`preview-block-${index}`}
            className="preview-block"
            style={{ backgroundColor: value }}
          ></div>
        ))}
      </div>
    </Container>
  );
}

export default Stage;
