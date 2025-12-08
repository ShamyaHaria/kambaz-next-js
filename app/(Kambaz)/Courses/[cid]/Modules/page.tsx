"use client";

import { useParams } from "next/navigation";
import * as client from "../../client";
import { useState, useEffect } from "react";
import "../../../styles.css";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { setModules, editModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
    const params = useParams();
    const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;

    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();

    const isFacultyOrAdmin =
        currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN");

    // true = all modules expanded, false = collapsed
    const [allExpanded, setAllExpanded] = useState(true);

    const fetchModules = async () => {
        if (!cid) return;
        const loaded = await client.findModulesForCourse(cid);
        dispatch(setModules(loaded));
        setAllExpanded(true); // default = expanded
    };

    useEffect(() => {
        fetchModules();
    }, [cid]);

    const onCreateModuleForCourse = async (lessons: any[] = []) => {
        if (!cid || !moduleName.trim()) return;
        const newModule = {
            name: moduleName,
            lessons,
            course: cid,
        };
        const module = await client.createModuleForCourse(cid, newModule);
        dispatch(setModules([...modules, module]));
        setModuleName("");
        setAllExpanded(true);
    };

    const onRemoveModule = async (moduleId: string) => {
        if (!cid) return;
        await client.deleteModule(cid, moduleId);
        const newModules = modules.filter((m: any) => m._id !== moduleId);
        dispatch(setModules(newModules));
    };

    const onUpdateModule = async (moduleId: string, updates: any) => {
        if (!cid) return;
        await client.updateModule(cid, moduleId, updates);
        const newModules = modules.map((m: any) =>
            m._id === moduleId ? { ...m, ...updates } : m
        );
        dispatch(setModules(newModules));
    };

    // called when the existing toolbar Collapse All button is clicked
    const toggleAll = () => {
        setAllExpanded((prev) => !prev);
    };

    return (
        <div>
            {isFacultyOrAdmin && (
                <ModulesControls
                    setModuleName={setModuleName}
                    moduleName={moduleName}
                    addModule={onCreateModuleForCourse}
                    allExpanded={allExpanded}
                    onToggleAll={toggleAll}
                />
            )}

            <br />
            <br />
            <br />
            <br />
            <ListGroup className="rounded-0" id="wd-modules">
                {modules.map((module: any) => (
                    <ListGroupItem
                        key={module._id}
                        className="wd-module p-0 mb-5 fs-5 border-gray"
                    >
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            {!module.editing && module.name}
                            {module.editing && isFacultyOrAdmin && (
                                <FormControl
                                    className="w-50 d-inline-block"
                                    onChange={(e) =>
                                        onUpdateModule(module._id, { name: e.target.value })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onUpdateModule(module._id, { editing: false });
                                        }
                                    }}
                                    defaultValue={module.name}
                                />
                            )}
                            {isFacultyOrAdmin && (
                                <ModuleControlButtons
                                    moduleId={module._id}
                                    deleteModule={(moduleId) => onRemoveModule(moduleId)}
                                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                                />
                            )}
                        </div>

                        {/* Show lessons only when allExpanded is true */}
                        {allExpanded && module.lessons && (
                            <ListGroup className="wd-lessons rounded-0">
                                {module.lessons.map((lesson: any) => (
                                    <ListGroupItem
                                        key={lesson._id}
                                        className="wd-lesson p-3 ps-1"
                                    >
                                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}
