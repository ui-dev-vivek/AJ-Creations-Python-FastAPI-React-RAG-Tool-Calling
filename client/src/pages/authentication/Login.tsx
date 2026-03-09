import { Input } from "@heroui/input";
import React from "react";

import AuthLayout from "@/layouts/authentication";
import api from "@/utils/api";

const Login: React.FC = () => {
  const [mobileNumber, setMobileNumber] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [otpSent, setOtpSent] = React.useState<boolean>(false);
  const [otp, setOtp] = React.useState<string>("");

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(value);
  };

  const handleLogin = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      setError("Please enter a valid mobile number");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await api.post("/auth/authenticate", {
        mobile: mobileNumber,
      });
      setOtpSent(true);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to send OTP. Please try again.",
      );
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
        otp: otp,
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_id", response.data.user_id);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl shadow-lg shadow-black/5 overflow-hidden flex flex-col w-full">
        {/* Banner Section */}
        <div className="relative w-full h-56 bg-gray-100">
          <img
            src="/images/login-banner.png"
            alt="Welcome Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-10 flex flex-col bg-white">
          <h4 className="text-xl font-bold text-[#2D2D2D] mb-8">
            {otpSent ? "Verify Profile" : "Sign Up to view your profile"}
          </h4>

          <div className="space-y-10">
            {!otpSent ? (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-500">
                    Country
                  </label>
                  <div className="flex items-end border-b-2 border-gray-200 pb-2 gap-4 focus-within:border-[#9F2089] transition-colors">
                    <span className="font-bold text-[#2D2D2D] text-lg min-w-[60px]">
                      IN +91
                    </span>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={mobileNumber}
                      onChange={handleMobileChange}
                      className="w-full text-lg font-semibold outline-none placeholder:text-gray-300 bg-transparent text-[#2D2D2D]"
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading || mobileNumber.length < 10}
                  className="w-full h-14 bg-[#9F2089] text-white rounded-lg font-bold text-lg hover:bg-[#861C74] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#9F2089]/10"
                >
                  {loading ? "Please wait..." : "Log In"}
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-500">
                    Enter OTP sent to +91 {mobileNumber}
                  </label>
                  <div className="border-b-2 border-gray-200 pb-2 focus-within:border-[#9F2089] transition-colors">
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={handleOtpChange}
                      maxLength={6}
                      className="w-full text-2xl font-bold tracking-[0.2em] outline-none placeholder:text-gray-200 bg-transparent text-[#2D2D2D] placeholder:tracking-normal"
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.length < 6}
                    className="w-full h-14 bg-[#9F2089] text-white rounded-lg font-bold text-lg hover:bg-[#861C74] transition-colors disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </button>
                  <button
                    onClick={() => {
                      setOtpSent(false);
                      setError("");
                    }}
                    className="text-sm font-bold text-[#9F2089] hover:underline"
                  >
                    Change phone number
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-20 text-center">
            <p className="text-[11px] text-gray-400 font-medium px-4">
              By continuing, you agree to MAVA's <br />
              <a href="/terms" className="text-[#9F2089] font-bold">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-[#9F2089] font-bold">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
