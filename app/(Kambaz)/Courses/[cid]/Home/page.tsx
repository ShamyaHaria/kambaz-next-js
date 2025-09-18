import Modules from "../Modules/page";
import CourseStatus from "./status";
export default function Home() {
    return (
        <div id="wd-home">
            <button>Collapse All</button>
            <button>View Progress</button>
            <select defaultValue="Publish All">
                <option>Publish All</option>
                <option>Publish Drafts</option>
                <option>Publish Reviews</option>
                <option>Publish Final</option>
            </select>
            <button>+ Module</button>
            <table>
                <tbody>
                    <tr>
                        <tr>
                            <td valign="top" width="70%"> <Modules /> </td>
                            <td valign="top"> <CourseStatus /> </td>
                        </tr>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}