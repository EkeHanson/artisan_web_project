import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import axios from "axios";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const CostumerLogin1 = () => {
      const [flash, setFlash] = useState(null);    
      const showMessage = (message, type) => {
        setFlash({ message, type });
      };
    
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [inputType, setInputType] = useState("email");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // Load remembered email/phone from localStorage
    useEffect(() => {
        const savedEmail = sessionStorage.getItem("email");
        const savedPhone = sessionStorage.getItem("phone");
        if (savedEmail) setEmail(savedEmail);
        if (savedPhone) setPhone(savedPhone);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (inputType === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!email) {
                setError("Please enter your email.");
                return;
            } else if (!emailRegex.test(email)) {
                setError("Please enter a valid email.");
                return;
            }
        } else if (inputType === "phone") {
            const phoneRegex = /^\+[1-9]{1}[0-9]{3,14}$/;
            if (!phone) {
                setError("Please enter your phone number.");
                return;
            } else if (!phoneRegex.test(phone)) {
                setError("Please enter a valid phone number with country code (e.g., +2348146955393).");
                return;
            }
        }
    
        setError("");
        setLoading(true);
    
        try {
            const data = inputType === "email" ? { email } : { phone };
            const response = await axios.post(`${djangoHostname}/api/accounts/auth/api/send-login-token/`, data);
    
            if (response.status === 200) {
                navigate("/verify-email", { state: { email, phone, inputType } });
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.error;
    
                if (error.response.status === 403 && errorMessage === "User has not been approved") {
                    const uniqueId = error.response.data.unique_id;
    
                    showMessage("You have not been approved yet. Please wait 24 hours or contact the admin.", "failure");
    
                    setTimeout(() => {
                        navigate("/pending-approval", { state: { uniqueId } });
                    }, 5000);
    
                } else if (error.response.status === 403 && errorMessage === "Your account has been suspended") {
                    showMessage("Your account has been suspended. Please contact support for further assistance.", "failure");
                } else {
                    setError(errorMessage || "Failed to send token. Please try again later.");
                }
            } else {
                setError("Failed to send token. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };
    

    
    return (
        <div className="Gradnded-page">
            <div className="navigating-ttarvs">
                <div className="site-container">
                    <p>
                        <Link to="/">Simservicehub</Link> <ChevronRightIcon />
                        <Link to="/login"> Login </Link>
                    </p>
                </div>
            </div>

            <div className="site-container">
                <div className="Gradnded-main">
                    <div className="Gradnded-Box Shirolls_Box">
                        <div className="Gradnded-Box-header">
                            <h2 className="big-text">Sign in or Create an Account</h2>
                            <p>
                                With a simservicehub account, you can easily chat with, manage, and hire tradespeople for your job. Enter your email address, and we'll send you a verification email to begin.
                            </p>
                        </div>

                        <div className="Gradnded-Box-Body">

                        {flash && (
                        <FlashMessage
                            message={flash.message}
                            type={flash.type}
                            onClose={() => setFlash(null)}
                        />
                        )}
                            <div className="Gland-Quest">
                                <div className="Gland-Quest-data">
                                    <label>Select where to receive Auth code</label>
                                    <select 
                                        value={inputType} 
                                        onChange={(e) => setInputType(e.target.value)}
                                    >
                                        <option value="email">Email</option>
                                        <option value="phone">Phone number</option>
                                    </select>
                                </div>

                                {inputType === "email" ? (
                                    <div className="Gland-Quest-data">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            placeholder="Type your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <div className="Gland-Quest-data">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="Type your phone number with country code (e.g., +2348146955393)"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                )}
                                {error && <p className="error-message">{error}</p>}

                                <div className="Rememevbe">
                                    <input 
                                        type="checkbox" 
                                        id="remember_me" 
                                        checked={rememberMe} 
                                        onChange={() => setRememberMe(!rememberMe)} 
                                    />
                                    <label htmlFor="remember_me">Remember me</label>
                                </div>

                                <div className="Gland-Cnt-Btn">
                                    <button 
                                        type="submit" 
                                        className="post-job-btn" 
                                        onClick={handleSubmit} 
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Continue'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostumerLogin1;
