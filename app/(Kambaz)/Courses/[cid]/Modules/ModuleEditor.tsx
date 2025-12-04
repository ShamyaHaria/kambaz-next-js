import { Modal, FormControl, Button, Form, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

interface Lesson {
  _id: string;
  name: string;
  description?: string;
}

export default function ModuleEditor({
  show,
  handleClose,
  dialogTitle,
  moduleName,
  setModuleName,
  addModule
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: (lessons: Lesson[]) => void;
}) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonName, setLessonName] = useState("");

  const addLesson = () => {
    if (!lessonName.trim()) return;
    const newLesson = {
      _id: uuidv4(),
      name: lessonName,
      description: "New Lesson"
    };
    setLessons([...lessons, newLesson]);
    setLessonName("");
  };

  const removeLesson = (lessonId: string) => {
    setLessons(lessons.filter(l => l._id !== lessonId));
  };

  const handleSave = () => {
    addModule(lessons);
    setLessons([]);
    setLessonName("");
    handleClose();
  };

  const handleCancel = () => {
    setLessons([]);
    setLessonName("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Module Name</Form.Label>
          <FormControl
            value={moduleName}
            placeholder="Enter module name"
            onChange={(e) => setModuleName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Add Lessons</Form.Label>
          <div className="d-flex gap-2">
            <FormControl
              value={lessonName}
              placeholder="Lesson name"
              onChange={(e) => setLessonName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLesson();
                }
              }}
            />
            <Button variant="secondary" onClick={addLesson} size="sm">
              <FaPlus />
            </Button>
          </div>
        </Form.Group>

        {lessons.length > 0 && (
          <>
            <Form.Label className="fw-bold">Lessons ({lessons.length}):</Form.Label>
            <ListGroup className="mb-3">
              {lessons.map((lesson) => (
                <ListGroup.Item
                  key={lesson._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{lesson.name}</span>
                  <FaTrash
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeLesson(lesson._id)}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!moduleName.trim()}
        >
          Add Module
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
