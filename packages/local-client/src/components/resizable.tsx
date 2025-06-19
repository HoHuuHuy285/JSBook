import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [
        Math.floor(window.innerWidth) * 0.2,
        Math.floor(window.innerWidth),
      ],
      maxConstraints: [Math.floor(window.innerWidth) * 0.75, Infinity],
      height: Math.floor(Infinity),
      width: Math.floor(window.innerWidth * 0.75),
      resizeHandles: ["e"],
    };
  } else {
    resizableProps = {
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 300,
      width: Math.floor(window.innerWidth),
      // width:  Infinity ,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
