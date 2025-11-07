"use client";
import { useSelector, useDispatch } from "react-redux";

export default function HelloRedux() {
  let message = "";
  let dispatch: any = () => {};
  
  try {
    const state = useSelector((state: any) => state.helloReducer);
    message = state?.message || "";
    dispatch = useDispatch();
  } catch (error) {
    // Redux not available during build
  }
  
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
    </div>
  );
}