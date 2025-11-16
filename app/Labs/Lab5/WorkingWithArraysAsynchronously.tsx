'use client';
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchTodos = async () => {
        try {
            const data = await client.fetchTodos();
            console.log('fetchTodos response:', data);
            console.log('Is array?', Array.isArray(data));
            setTodos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setTodos([]);
        } finally {
            setLoading(false);
        }
    };

    const removeTodo = async (todo: any) => {
        const updatedTodos = await client.removeTodo(todo);
        console.log('removeTodo response:', updatedTodos);
        setTodos(Array.isArray(updatedTodos) ? updatedTodos : []);
    };

    const createTodo = async () => {
        const data = await client.createTodo();
        console.log('createTodo response:', data);
        console.log('Is array?', Array.isArray(data));
        setTodos(Array.isArray(data) ? data : []);
    };

    const postTodo = async () => {
        const newTodo = await client.postTodo({
            title: "New Posted Todo", completed: false,
        });
        console.log('postTodo response:', newTodo);
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = async (todo: any) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }

    };

    const editTodo = (todo: any) => {
        const updatedTodos = todos.map(
            (t) => t.id === todo.id ? { ...todo, editing: true } : t
        );
        setTodos(updatedTodos);
    };

    const updateTodo = async (todo: any) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
        }

    };

    useEffect(() => {
        fetchTodos();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            {errorMessage && (<div id="wd-todo-error-message"
                className="alert alert-danger mb-2 mt-2">
                {errorMessage}
            </div>)}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Todos</h4>
                <div>
                    <FaPlusCircle
                        onClick={postTodo}
                        className="text-primary fs-3 me-3 cursor-pointer"
                        id="wd-post-todo"
                    />
                    <FaPlusCircle
                        onClick={createTodo}
                        className="text-success fs-3 cursor-pointer"
                        id="wd-create-todo"
                    />
                </div>
            </div>
            <ul className="list-unstyled">
                {Array.isArray(todos) && todos.map((todo) => (
                    <li key={todo.id} className="border rounded p-3 mb-2 d-flex align-items-center">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
                            className="me-3 form-check-input"
                            style={{ width: '20px', height: '20px' }}
                        />
                        {!todo.editing ? (
                            <span
                                style={{
                                    textDecoration: todo.completed ? "line-through" : "none",
                                    fontSize: '1.1rem'
                                }}
                                className="flex-grow-1"
                            >
                                {todo.title}
                            </span>
                        ) : (
                            <input
                                className="form-control flex-grow-1 me-3"
                                defaultValue={todo.title}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, editing: false });
                                    }
                                }}
                                onChange={(e) =>
                                    updateTodo({ ...todo, title: e.target.value })
                                }
                            />
                        )}
                        <div className="d-flex gap-2 ms-3">
                            <FaPencil
                                onClick={() => editTodo(todo)}
                                className="text-primary cursor-pointer fs-5"
                            />
                            <TiDelete
                                onClick={() => deleteTodo(todo)}
                                className="text-danger cursor-pointer"
                                style={{ fontSize: '1.5rem' }}
                                id="wd-delete-todo"
                            />
                            <FaTrash
                                onClick={() => removeTodo(todo)}
                                className="text-danger cursor-pointer fs-5"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}