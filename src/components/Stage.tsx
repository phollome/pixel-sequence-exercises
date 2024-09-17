import classNames from "classnames";
import React from "react";

function Stage(props: {
  type: "preview" | "canvas";
  content?: string;
  resetTriggerRef?: React.MutableRefObject<HTMLButtonElement | null>;
  grid: string;
}) {
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

  const Container = (props: {children: React.ReactNode}) => {
    return (
      <div className="w-1/2 bg-zinc-900 flex justify-center items-center">
        {props.children}
      </div>
    );
  }

  const classes = classNames("grid", {
    "w-20 grid-cols-4 h-20 grid-rows-4": props.grid === "4x4",
  });

  const content = props.content || "";

  if (props.type === "canvas") {

    const Comp = () => {
      return (
        <Container>
        <div
          id={props.type}
          className={classes}
          dangerouslySetInnerHTML={{ __html: content  }}
        />
        </Container>
      );
    };

    return <Comp />;
  }


  return <Container><div id={props.type} className={classes} dangerouslySetInnerHTML={{ __html: content  }}/></Container>;
}

export default Stage;
