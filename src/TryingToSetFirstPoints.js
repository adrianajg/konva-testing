import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Stage, Layer, Circle, Line } from "react-konva";
import { render } from "react-dom";
import Konva from "konva";

function App() {
  const [points, setPoints] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [touchingTarget, setTouchingTarget] = useState(false);

  const handleMouseMove = (e) => {
    const cursor = e.currentTarget.getPointerPosition();
    if (points.length === 1) {
      const lastPointFirstX = points[0][0];
      const lastPointFirstY = points[0][1];
      setPoints((current) => [
        lastPointFirstX,
        lastPointFirstY,
        cursor.x,
        cursor.y,
      ]);
    } else {
      const lastPointFirstX = points[-1][0];
      const lastPointFirstY = points[-1][1];
      setPoints((current) => [
        lastPointFirstX,
        lastPointFirstY,
        cursor.x,
        cursor.y,
      ]);
    }

    // setPoints((current) => [
    //   lastPointFirstX,
    //   lastPointFirstY,
    //   cursor.x,
    //   cursor.y,
    // ]);
  };

  const removeLastPoint = () => {
    setPoints((current) => {
      return current.slice(0, -1);
    });
  };

  const handleSetLastPoints = (x, y) => {
    console.log("in handleSetLastPoints");
    // const objectX = e.target.attrs.x;
    // const objectY = e.target.attrs.y;
    setPoints((current) => [current[0], current[1], x, y]);
  };

  const handleSetFirstPoint = (x, y) => {
    console.log("in handleSetFirstPoints. Coordinates passed in are", x, y);
    if (!points | (points === [])) {
      setPoints([[x, y, x, y]]);
      setDrawing(true);
      return;
    }
    setPoints((current) => [...current], [x, y, x, y]);
    setDrawing(true);
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
            if (drawing) {
              handleMouseMove(e);
            }
          }}
          onMouseUp={() => {
            if (!drawing) {
              return;
            }
            if (!touchingTarget) {
              console.log("in first circle onMouseUp. removing point");
              setDrawing(false);
              removeLastPoint();
            }
          }}
        >
          <Layer>
            <Circle
              key={1}
              x={800}
              y={400}
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
              onMouseDown={(e) => {
                if (!drawing) {
                  handleSetFirstPoint(e.target.attrs.x, e.target.attrs.y);
                }
                console.log(drawing);
                setDrawing(true);
              }}
              onMouseUp={(e) => {
                if (!touchingTarget) {
                  removeLastPoint();
                  return;
                }
                console.log("in onMouseUp second circle");
                console.log(e);
                handleSetLastPoints(e.target.attrs.x, e.target.attrs.y);
                console.log(points);
                setDrawing(false);
                console.log("drawing is", drawing);
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
              onMouseDown={() => {
                console.log(drawing);
                setDrawing(true);
              }}
              onMouseUp={(e) => {
                if (!touchingTarget) {
                  removeLastPoint();
                  return;
                }
                console.log("in onMouseUp second circle");
                console.log(e);
                handleSetLastPoints(e.target.attrs.x, e.target.attrs.y);
                console.log(points);
                setDrawing(false);
                console.log("drawing is", drawing);
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
