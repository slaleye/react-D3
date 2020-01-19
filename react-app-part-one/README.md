### Part Three: X/Y scales

Methods from D3:
 -axisBottom
 -axisRight
 -scaleLinear

##  Part Two: line chart with D3

React [Hooks](https://reactjs.org/docs/hooks-effect.html) used: 
"Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class".

- [Ref](https://reactjs.org/docs/refs-and-the-dom.html) (useRef): 
provide a way to access DOM nodes or React elements created in  the render method.

- Effect(useEffect):
 The Effect Hook, useEffect, adds the ability to perform side effects from a function component. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API

- State (useState)
````js
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
````
D3 methods: 
- select
- line
- curveCardinal

