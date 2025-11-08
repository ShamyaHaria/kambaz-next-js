'use client';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
import Button from "react-bootstrap/esm/Button";
import FormControl from "react-bootstrap/esm/FormControl";

export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  
  let sum = 0;
  let dispatch: any = () => {};
  
  try {
    const state = useSelector((state: any) => state.addReducer);
    sum = state?.sum || 0;
    dispatch = useDispatch();
  } catch (error) {
    // Redux not available during build
  }
  
  return (
    <div className="w-25" id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>
      <FormControl type="number" defaultValue={a.toString()}
        onChange={(e) => setA(parseInt(e.target.value) || 0)} />
      <FormControl type="number" defaultValue={b.toString()}
        onChange={(e) => setB(parseInt(e.target.value) || 0)} />
      <Button id="wd-add-redux-click"
              onClick={() => dispatch(add({ a, b }))}>
        Add Redux
      </Button>
      <hr/>
    </div>
  );
}