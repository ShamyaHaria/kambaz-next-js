export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of your website.
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-due">Due Date</label>
                    </td>
                    <td>
                        <input type="date" id="wd-due" />
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-type">Assignment Type</label>
                    </td>
                    <td>
                        <select id="wd-type" defaultValue="Homework">
                            <option>Homework</option>
                            <option>Project</option>
                            <option>Quiz</option>
                            <option>Exam</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-graded">Graded?</label>
                    </td>
                    <td>
                        <input type="checkbox" id="wd-graded" defaultChecked />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button type="button">Save Assignment</button>
                    </td>
                </tr>
            </table>
        </div>
    );
}