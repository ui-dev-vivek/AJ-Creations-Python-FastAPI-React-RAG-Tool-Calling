import api from "@/utils/api";
import { Input } from "@heroui/input";
import React from "react";

const Login: React.FC = () => {

    const [mobileNumber, setMobileNumber] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [otpSent, setOtpSent] = React.useState<boolean>(false);
    const [otp, setOtp] = React.useState<string>("");
    const [resendTimer, setResendTimer] = React.useState<number>(0);
    const [userExists, setUserExists] = React.useState<boolean | null>(null);
    const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMobileNumber(e.target.value);
    }
    
    const handleLogin = async () => {
        if (!mobileNumber || mobileNumber.length < 10) {
            setError("Please enter a valid mobile number");
            return;
        }
        
        setLoading(true);
        setError("");
        try {
            const response = await api.post("/auth/authenticate", { mobile: mobileNumber });
            console.log("OTP Response:", response);
            setOtpSent(true);
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to send OTP. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await api.post("/auth/authenticate", { 
                mobile: mobileNumber, 
                otp: otp 
            });
            console.log("Login Response:", response);
            
            // Store tokens in localStorage
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token || "");
            localStorage.setItem("user_id", response.data.user_id);
            
            // Redirect to dashboard or home
            window.location.href = "/";
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to verify OTP. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
        setOtp(value);
    }

    return (
        <div className="min-h-screen bg-[#fdebf0]">
            {/* 3 Equal Parts Layout - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 min-h-screen">
                <div className=""></div>             
                <div className="">
                    <section className="flex flex-col justify-center items-center rounded-lg bg-white shadow-md">
                        <img src="/images/login-banner.png" alt="" className="rounded-t-xl" />
                        <div className="py-8 px-6 w-full max-w-sm">
                            {!otpSent ? (
                                <>
                                    <h3 className="text-2xl font-bold">Sign Up to view your profile</h3>
                                    <div className="flex flex-col gap-4 mt-6">
                                        <Input
                                            className="w-full"
                                            label="Phone Number"
                                            labelPlacement="outside"
                                            placeholder="Enter your phone number"
                                            type="tel"
                                            value={mobileNumber}
                                            onChange={handleMobileChange}
                                            errorMessage={error}
                                            color={error ? "danger" : "default"}
                                        />
                                    </div>
                                    <button 
                                        onClick={handleLogin}
                                        disabled={loading}
                                        className="mt-6 w-full bg-primary text-white rounded-md py-4 text-xl hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Sending OTP..." : "Continue"}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold">Enter OTP</h3>
                                    <p className="text-gray-600 mt-2">
                                        We've sent a 6-digit OTP to <span className="font-semibold">{mobileNumber}</span>
                                    </p>
                                    <div className="flex flex-col gap-4 mt-6">
                                        <Input
                                            className="w-full"
                                            label="OTP"
                                            labelPlacement="outside"
                                            placeholder="Enter 6-digit OTP"
                                            type="text"
                                            value={otp}
                                            onChange={handleOtpChange}
                                            maxLength={6}
                                            errorMessage={error}
                                            color={error ? "danger" : "default"}
                                        />
                                    </div>
                                    <button 
                                        onClick={handleVerifyOtp}
                                        disabled={loading}
                                        className="mt-6 w-full bg-primary text-white rounded-md py-4 text-xl hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Verifying..." : "Verify OTP"}
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setOtpSent(false);
                                            setOtp("");
                                            setError("");
                                        }}
                                        className="mt-3 w-full bg-gray-200 text-gray-800 rounded-md py-2 text-sm hover:bg-gray-300 transition"
                                    >
                                        Change Mobile Number
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="px-6 md:px-8 py-5 bg-gradient-to-r rounded-b-xl from-default-50 to-default-100 border-t border-default-200 w-full">
                            <p className="text-xs md:text-xs text-center text-default-600 leading-relaxed">
                                By continuing, you agree to MAVA's&nbsp;
                                <a className="underline text-primary font-semibold hover:text-primary/80 transition" href="#">
                                    Terms & Conditions
                                </a>
                                &nbsp;and&nbsp;
                                <a className="underline text-primary font-semibold hover:text-primary/80 transition" href="#">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </section>
                </div>
                {/* Right Section */}
                <div className=""></div>
            </div>
        </div>
    );
}

export default Login;
