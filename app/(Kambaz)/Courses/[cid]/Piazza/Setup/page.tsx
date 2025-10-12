import '../styles.css';
import { Form } from "react-bootstrap";

export default function PiazzaSetup({ params }: { params: { cid: string } }) {
    const { cid } = params;
    return (
        <div id="wd-piazza">
            <div className="wd-piazza-header">
                <h1>piazza</h1>
            </div>

            <div className="wd-piazza-content">
                <h2 className="text-secondary">Piazza Setup</h2>

                <div className="wd-piazza-section">
                    <h4 className="mb-3">School Information</h4>
                    <div className="mb-3">
                        <Form.Label>School Name:</Form.Label>
                        <Form.Control defaultValue="Northeastern University" readOnly />
                    </div>
                    <div className="mb-3">
                        <Form.Label>School Email(s):</Form.Label>
                        <Form.Control defaultValue="neu.edu" readOnly />
                    </div>
                </div>

                <div className="wd-piazza-section">
                    <h4 className="mb-3">Piazza Class Does Not Yet Exist</h4>
                    <div className="mb-3">
                        <Form.Label>Class Name:</Form.Label>
                        <Form.Control defaultValue={cid} readOnly />
                    </div>
                    <div className="mb-3">
                        <Form.Label>Class Number:</Form.Label>
                        <Form.Control defaultValue={cid} readOnly />
                    </div>
                    <div className="mb-3">
                        <Form.Label>Term:</Form.Label>
                        <Form.Control defaultValue="Fall 2025" readOnly />
                    </div>
                    <p className="mt-3">
                        The class instructor or TA has not yet created this class in Piazza.
                        Please ask them to click on the <strong>Piazza</strong> app link in your
                        LMS to create the class!
                    </p>
                </div>
            </div>

            <footer className="wd-piazza-footer">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5>Company</h5>
                        <ul>
                            <li>Our Story</li>
                            <li>Our Investors</li>
                            <li>Jobs</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Product</h5>
                        <ul>
                            <li>Why Piazza Works</li>
                            <li>Features</li>
                            <li>Product FAQ</li>
                            <li>Instructor FAQ</li>
                            <li>LMS Integration</li>
                            <li>Accessibility</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Support</h5>
                        <ul>
                            <li>Help</li>
                            <li>Contact Us</li>
                            <li>Resources For Instructors</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Links</h5>
                        <ul>
                            <li>Home</li>
                            <li>Blog</li>
                            <li>Mobile</li>
                            <li>Login Page</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}