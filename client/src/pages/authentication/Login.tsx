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
        setLoading(true);
        setError("");
        try {
            const response = await api.post("/auth/authenticate", { mobile: mobileNumber });
            console.log(response);
            setOtpSent(true);
        } catch (err) {
            setError("Failed to send OTP. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = () => {
        const response = api.post("/auth/authenticate", { mobile: mobileNumber, otp: otp });
        alert(response.token);
    };


    return (
        <div className="min-h-screen bg-[##fdebf0] ">
            {/* 3 Equal Parts Layout - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 min-h-screen">

                {/* Left Section */}
                <div className="">

                </div>
                {/* main Section */}
                <div className="">
                    <section className="flex flex-col justify-center items-center rounded-lg bg-white shadow-md">
                        <img src="/images/login-banner.png" alt="" className="rounded-t-xl" />
                        <div className="py-8 px-1">
                            <h3 className="text-2xl font-bold">Sign Up to view your profile</h3>
                            <div className="flex flex-col gap-4 mt-6">
                                <Input
                                    className="w-full"
                                    label="Phone Number"
                                    labelPlacement="outside"
                                    placeholder="Enter your phone number"
                                    type="text"
                                    value={mobileNumber || ""}
                                    onChange={handleMobileChange}
                                />

                            </div>
                            <button 
                                onClick={handleLogin}
                            className="mt-6  w-full bg-primary text-white rounded-md py-4 text-xl hover:bg-primary-dark transition">
                                Continue
                            </button>
                        </div>
                       <div className="px-6 md:px-8 py-5 bg-gradient-to-r rounded-b-xl from-default-50 to-default-100 border-t border-default-200">
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
                <div className="">

                </div>



            </div>
        </div>
    );
}

export default Login;