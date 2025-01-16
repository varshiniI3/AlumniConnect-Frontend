import React from 'react';
import './privacypolicy.css';
import Navbar from '../home/Navbar';

function PrivacyPolicy() {
    return (
        <div className="privacypolicy">
            <Navbar/>
            <div className="content">
                <h1 className="title">Privacy Policy</h1>
                <p>
                    At Alumni Connect, we are committed to protecting your privacy. This Privacy Policy outlines the types
                    of information we collect, how we use it, and the measures we take to keep it secure.
                </p>
                <h2>Information We Collect</h2>
                <p>
                    We collect personal information that you voluntarily provide to us when registering on the website,
                    such as your name, email address, and professional details. We may also collect non-personal
                    information through cookies and analytics tools.
                </p>
                <h2>How We Use Your Information</h2>
                <ul>
                    <li>To personalize your experience on our platform</li>
                    <li>To improve our website and services</li>
                    <li>To communicate with you regarding updates and events</li>
                    <li>To ensure a secure and safe browsing experience</li>
                </ul>
                <h2>Sharing Your Information</h2>
                <p>
                    We do not share your personal information with third parties without your consent, except as required
                    by law or to protect our rights.
                </p>
                <h2>Your Choices</h2>
                <p>
                    You have the right to access, update, or delete your personal information. To exercise these rights,
                    please contact us at support@alumni-connect.com.
                </p>
                <h2>Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy, feel free to contact us at
                    privacy@alumni-connect.com.
                </p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
