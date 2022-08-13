import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Stage, Layer, Circle, Line } from "react-konva";
import { render } from "react-dom";
import Konva from "konva";

function App() {
  const [points, setPoints] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [touchingTarget, setTouchingTarget] = useState(false);

  const setLineStartPoints = (e) => {
    console.log(e.target.attrs.x);
    const firstPoints = [];
    setPoints([
      e.target.attrs.x,
      e.target.attrs.y,
      e.target.attrs.x,
      e.target.attrs.y,
    ]);
  };

  const handleMouseMove = (e) => {
    const cursor = e.currentTarget.getPointerPosition();
    setPoints((current) => [800, 400, cursor.x, cursor.y]);
  };

  const removeLastPoint = () => {
    setPoints((current) => {
      return current.slice(0, -1);
    });
  };

  const handleSetPoints = (x, y) => {
    console.log("in handleSetPoints");
    // const objectX = e.target.attrs.x;
    // const objectY = e.target.attrs.y;
    setPoints((current) => [current[0], current[1], x, y]);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Stage
          // className="stage-container"
          id={"stage"}
          width={window.innerWidth}
          height={window.innerHeight}
          // onMouseDown={handleMouseMove}
          onMouseMove={(e) => {
            if (clicked) {
              handleMouseMove(e);
            }
          }}
          onMouseUp={() => {
            if (!touchingTarget) {
              console.log("in first circle onMouseUp. removing point");
              setClicked(false);
              removeLastPoint();
            }
          }}
        >
          <Layer>
            <Circle
              x={800}
              y={400}
              fill="#72D6C9"
              radius={45}
              opacity={0.7}
              // draggable
              onMouseOver={(e) => {
                e.target.fill("yellow");
                setTouchingTarget(true);
              }}
              onMouseOut={(e) => {
                e.target.fill("#72D6C9");
                setTouchingTarget(false);
              }}
              // onClick={setLineStartPoints}
              // onMouseMove={handleMouseMove}
              onMouseDown={() => {
                console.log(clicked);
                setClicked(true);
              }}
            ></Circle>
            <Circle
              key={2}
              x={1000}
              y={300}
              fill="#72D6C9"
              radius={45}
              opacity={0.7}
              onMouseOver={(e) => {
                e.target.fill("yellow");
                setTouchingTarget(true);
              }}
              onMouseOut={(e) => {
                e.target.fill("#72D6C9");
                setTouchingTarget(false);
              }}
              onMouseUp={(e) => {
                if (!touchingTarget) {
                  removeLastPoint();
                  return;
                }
                console.log("in onMouseUp second circle");
                console.log(e);
                handleSetPoints(e.target.attrs.x, e.target.attrs.y);
                console.log(points);
                setClicked(false);
                console.log("clicked is", clicked);
              }}
            ></Circle>
            <Line id={"line"} strokeWidth={7} stroke="white" points={points} />
          </Layer>
        </Stage>
      </main>
    </div>
  );
}

export default App;
