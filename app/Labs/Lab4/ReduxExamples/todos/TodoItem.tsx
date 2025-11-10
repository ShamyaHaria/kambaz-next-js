import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";

export type Todo = {
    id: string; title: string
};

export default function TodoItem({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();
    return (
        <ListGroupItem>
            <Button variant="danger"
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="float-end">
                Delete </Button>
            <Button variant="warning"
                onClick={() => dispatch(setTodo(todo))}
                className="float-end me-2">
                Edit </Button>
            <span className="fs-2">{todo.title}</span>
        </ListGroupItem>
    );
}