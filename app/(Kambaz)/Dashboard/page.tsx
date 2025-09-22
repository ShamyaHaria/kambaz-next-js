import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.png" width={200} height={150} alt="ReactJS logo" />
                        <div>
                            <h5>CS1234 React JS</h5>
                            <p className="wd-dashboard-course-title">Full Stack Software Developer</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/2345" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.png" width={200} height={150} alt="ReactJS logo" />
                        <div>
                            <h5>CS2345 React Advanced</h5>
                            <p className="wd-dashboard-course-title">Advanced React Concepts</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/3456" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.png" width={200} height={150} alt="ReactJS logo" />
                        <div>
                            <h5>CS3456 React Hooks</h5>
                            <p className="wd-dashboard-course-title">Using Hooks Efficiently</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/4567" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.png" width={200} height={150} alt="ReactJS logo" />
                        <div>
                            <h5>CS4567 React State Management</h5>
                            <p className="wd-dashboard-course-title">State & Effect Management</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/5678" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.png" width={200} height={150} alt="ReactJS logo" />
                        <div>
                            <h5>CS5678 React Performance</h5>
                            <p className="wd-dashboard-course-title">Optimizing React Apps</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/6789" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.png" width={200} height={150} alt="ReactJS logo" />
                        <div>
                            <h5>CS6789 React Testing</h5>
                            <p className="wd-dashboard-course-title">Testing Strategies</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}