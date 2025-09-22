export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label><br />
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />

            <label htmlFor="wd-description">Description</label><br />
            <textarea
                id="wd-description"
                rows={7}
                defaultValue={`The assignment is available online Submit a link to the landing page of your Web application running on Vercel. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kambaz application Links to all relevant source code repositories The Kambaz application should include a link to navigate back to the landing page.`}
            />
            <br /><br />

            <label htmlFor="wd-points">Points</label><br />
            <input id="wd-points" value={100} /><br /><br />

            <label htmlFor="wd-group">Assignment Group</label><br />
            <select id="wd-group" defaultValue="ASSIGNMENT">
                <option value="ASSIGNMENT">ASSIGNMENT</option>
                <option value="EXAM">EXAM</option>
                <option value="PROJECT">PROJECT</option>
                <option value="PRACTICE">PRACTICE</option>
                <option value="LAB">LAB</option>
            </select><br /><br />

            <label htmlFor="wd-grade-display">Display Grade as</label><br />
            <select id="wd-grade-display" defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Pass/Fail">Pass/Fail</option>
                <option value="Not Graded">Not Graded</option>
            </select><br /><br />

            <label htmlFor="wd-submission-type">Submission Type</label><br />
            <select id="wd-submission-type" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="Online">In-Person</option>
            </select><br /><br />

            <div>
                <label>Online Entry Options</label><br />
                <input type="checkbox" id="wd-entry-text" /> <label htmlFor="wd-entry-text">Text Entry</label><br />
                <input type="checkbox" id="wd-entry-url" /> <label htmlFor="wd-entry-url">Website URL</label><br />
                <input type="checkbox" id="wd-entry-media" /> <label htmlFor="wd-entry-media">Media Recordings</label><br />
                <input type="checkbox" id="wd-entry-annotation" /> <label htmlFor="wd-entry-annotation">Student Annotation</label><br />
                <input type="checkbox" id="wd-entry-upload" /> <label htmlFor="wd-entry-upload">File Uploads</label><br />
            </div><br />

            <label htmlFor="wd-assign-to">Assign Assign to</label><br />
            <input id="wd-assign-to" value="Everyone" /><br /><br />

            <label htmlFor="wd-due">Due</label><br />
            <input id="wd-due" type="date" defaultValue="2024-05-13" /><br />

            <label htmlFor="wd-available-from">Available from</label>
            <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
            <label htmlFor="wd-available-until">Until</label>
            <input id="wd-available-until" type="date" defaultValue="2024-05-20" /><br /><br />

            <button type="button">Cancel</button>
            <button type="button">Save</button>
        </div>
    );
}