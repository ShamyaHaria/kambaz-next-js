'use client';
import { useState } from "react";
import FormControl from "react-bootstrap/esm/FormControl";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArrays() {
    const [todo, setTodo] = useState({
        id: "1", title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09", completed: false,
    });
    const API = `${HTTP_SERVER}/lab5/todos`;
    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>
            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${todo.id}/title/${todo.title}`}>
                Update Todo 
            </a>
            <FormControl defaultValue={todo.title} onChange=
                {(e) => setTodo({ ...todo, title: e.target.value })} /><hr />
            <h4>Retrieving Arrays</h4>
            <a href={API}>Get Todos </a><hr />
            <h4>Retrieving an Item from an Array by ID</h4>
            <a href={`${API}/${todo.id}`}> Get Todo by ID </a>
            <FormControl defaultValue={todo.id}
                onChange={(e) => setTodo({ ...todo, id: e.target.value })} /><hr />
            <h3>Filtering Array Items</h3>
            <a href={`${API}?completed=true`}>
                Get Completed Todos
            </a><hr />
            <h3>Creating new Items in an Array</h3>
            <a href={`${API}/create`}>
                Create Todo
            </a><hr />
            <h3>Removing from an Array</h3>
            <a href={`${API}/${todo.id}/delete`}>
                Remove Todo with ID = {todo.id} </a>
            <FormControl defaultValue={todo.id}
                onChange={(e) => setTodo({ ...todo, id: e.target.value })} /><hr />
        </div>
    );
}
