import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({ 
    moduleId, 
    deleteModule, 
    editModule 
}: {
    moduleId?: string;
    deleteModule?: (moduleId: string) => void;
    editModule?: (moduleId: string) => void
}) {
    return (
        <div className="float-end">
            {editModule && moduleId && (
                <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
            )}
            {deleteModule && moduleId && (
                <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
            )}
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}