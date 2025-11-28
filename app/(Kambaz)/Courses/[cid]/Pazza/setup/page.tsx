'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function PiazzaSetupPage() {
    const params = useParams();
    const courseId = params.cid as string;

    const courses = useSelector((state: any) => state.coursesReducer.courses);
    const currentCourse = courses.find((c: any) => c._id === courseId);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-blue-600 text-white py-4 px-6">
                <h1 className="text-2xl font-bold">piazza</h1>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <h2 className="text-3xl font-semibold text-gray-700 mb-8">Piazza Setup</h2>

                {/* School Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">School Information</h3>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    School Name:
                                </label>
                                <input
                                    type="text"
                                    value="Northeastern University"
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    School Email(s):
                                </label>
                                <input
                                    type="text"
                                    value="neu.edu"
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Piazza Class Does Not Yet Exist */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Piazza Class Does Not Yet Exist
                    </h3>

                    <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Class Name:
                                </label>
                                <input
                                    type="text"
                                    value={currentCourse?.name || 'CS5610 18616 Web Development'}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Class Number:
                                </label>
                                <input
                                    type="text"
                                    value={currentCourse?.number || 'CS 5610.18616.202610'}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Term:
                                </label>
                                <input
                                    type="text"
                                    value={currentCourse?.term || 'Spring 2026'}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-gray-800">
                            The class instructor or TA has not yet created this class in Piazza. Please ask them to click on the{' '}
                            <span className="font-semibold">Piazza</span> app link in your LMS to create the class!
                        </p>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-6">
                    <button
                        onClick={() => window.location.href = `/Courses/${courseId}/Pazza`}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Back to Piazza
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-12 py-8">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-semibold mb-3">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white">Our Story</a></li>
                                <li><a href="#" className="hover:text-white">Our Investors</a></li>
                                <li><a href="#" className="hover:text-white">Jobs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white">Why Piazza Works</a></li>
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Product FAQ</a></li>
                                <li><a href="#" className="hover:text-white">Instructor FAQ</a></li>
                                <li><a href="#" className="hover:text-white">LMS Integration</a></li>
                                <li><a href="#" className="hover:text-white">Accessibility</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white">Help</a></li>
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white">Resources For Instructors</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Links</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white">Home</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Mobile</a></li>
                                <li><a href="#" className="hover:text-white">Login Page</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-gray-400 text-center">
                        <p>Copyright © 2014 Piazza Technologies, Inc. All Rights Reserved</p>
                        <div className="mt-2 space-x-4">
                            <a href="#" className="hover:text-white">Privacy Policy</a>
                            <a href="#" className="hover:text-white">Copyright Policy</a>
                            <a href="#" className="hover:text-white">Terms of Service</a>
                            <a href="#" className="hover:text-white">FERPA</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}