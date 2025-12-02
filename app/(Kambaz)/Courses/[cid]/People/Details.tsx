import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import * as client from "../../../Account/client";
import { Form, FormControl, Button } from "react-bootstrap";

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void; }) {
    const [user, setUser] = useState<any>({});
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<any>({});

    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
        setEditedUser(user);
    };

    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        onClose();
    };

    const saveUser = async () => {
        await client.updateUser(editedUser);
        setUser(editedUser);
        setEditing(false);
        onClose();
    };

    const cancelEdit = () => {
        setEditedUser(user);
        setEditing(false);
    };

    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);

    if (!uid) return null;

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" />
            </button>

            <div className="text-center mt-2">
                <FaUserCircle className="text-secondary me-2 fs-1" />
            </div>
            <hr />

            <div className="text-danger fs-4 wd-name mb-3">
                {!editing && (
                    <FaPencil
                        onClick={() => setEditing(true)}
                        className="float-end fs-5 mt-2 wd-edit"
                        style={{ cursor: "pointer" }}
                    />
                )}
                {editing && (
                    <FaCheck
                        onClick={saveUser}
                        className="float-end fs-5 mt-2 me-2 wd-save"
                        style={{ cursor: "pointer" }}
                    />
                )}

                {!editing ? (
                    <div className="wd-name">
                        {user.firstName} {user.lastName}
                    </div>
                ) : (
                    <div>
                        <FormControl
                            className="mb-2"
                            placeholder="First Name"
                            value={editedUser.firstName || ""}
                            onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                        />
                        <FormControl
                            placeholder="Last Name"
                            value={editedUser.lastName || ""}
                            onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                        />
                    </div>
                )}
            </div>

            {!editing ? (
                <>
                    <b>Roles:</b> <span className="wd-roles">{user.role}</span> <br />
                    <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
                    <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
                    <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
                </>
            ) : (
                <>
                    <Form.Group className="mb-2">
                        <Form.Label><b>Role</b></Form.Label>
                        <Form.Select
                            value={editedUser.role || "STUDENT"}
                            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                        >
                            <option value="STUDENT">Student</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="ADMIN">Admin</option>
                            <option value="TA">TA</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label><b>Login ID (Read-only)</b></Form.Label>
                        <FormControl
                            value={editedUser.loginId || ""}
                            disabled
                            className="bg-light"
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label><b>Section</b></Form.Label>
                        <FormControl
                            value={editedUser.section || ""}
                            onChange={(e) => setEditedUser({ ...editedUser, section: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label><b>Total Activity (Read-only)</b></Form.Label>
                        <FormControl
                            value={editedUser.totalActivity || ""}
                            disabled
                            className="bg-light"
                        />
                    </Form.Group>
                </>
            )}

            <hr />

            {editing ? (
                <>
                    <button onClick={saveUser} className="btn btn-primary float-end wd-save-btn">
                        Save
                    </button>
                    <button onClick={cancelEdit} className="btn btn-secondary float-end me-2 wd-cancel">
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete">
                        Delete
                    </button>
                    <button onClick={onClose} className="btn btn-secondary float-end me-2 wd-cancel">
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
}