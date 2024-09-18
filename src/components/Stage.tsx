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

  const classes = classNames("grid");

  const styles = {
    width: `${width * 1.25}rem`,
    height: `${height * 1.25}rem`,
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
  };

  const items = Array.from({ length: width * height }, (_, index) => {
    return sequence[index % sequence.length];
  });

  if (props.type === "canvas") {
    const Comp = () => {
      return (
        <Container>
          <div id={props.type} className={classes} style={styles}>
            {items.map((value, index) => {
              const blank = typeof value !== "string" || value === "";
              const color =
                blank ? "transparent" : value;
              const classes = classNames(
                blank === false ? "block" : "", "transition-colors duration-300 ease-in"
              );
              return (
                <div
                  id={`block-${index}`}
                  key={`block-${index}`}
                  className={classes}
                  style={{ backgroundColor: color }}
                ></div>
              );
            })}
          </div>
        </Container>
      );
    };

    return <Comp />;
  }

  return (
    <Container>
      <div id={props.type} className={classes} style={styles}>
        {items.map((value, index) => {
          const color =
            typeof value === "string" && value !== "" ? value : "transparent";
          return (
            <div
              key={`preview-block-${index}`}
              className="w-5 h-5"
              style={{ backgroundColor: color }}
            ></div>
          );
        })}
      </div>
    </Container>
  );
}

export default Stage;
