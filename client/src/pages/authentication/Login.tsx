import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@heroui/input";
import React from "react";

import BaseLayout from "@/layouts/base";
import api from "@/utils/api";

const Login: React.FC = () => {
  const [mobileNumber, setMobileNumber] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [otpSent, setOtpSent] = React.useState<boolean>(false);
  const [otp, setOtp] = React.useState<string>("");

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumber(e.target.value);
  };

  const handleLogin = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      setError("Please enter a valid mobile number");

      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/authenticate", {
        mobile: mobileNumber,
      });

      console.log("OTP Response:", response);
      setOtpSent(true);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to send OTP. Please try again.",
      );
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
        otp: otp,
      });

      console.log("Login Response:", response);

      // Store tokens in localStorage
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token || "");
      localStorage.setItem("user_id", response.data.user_id);

      // Redirect to dashboard or home
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to verify OTP. Please try again.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);
  };

  return (
    <BaseLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#9E2189]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FFC72C]/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-white/60 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Side: Visual/Brand Content */}
          <div className="relative hidden lg:block bg-[#9E2189]">
            <img
              alt="MAVA Luxury"
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity hover:opacity-100 hover:mix-blend-normal transition-all duration-1000"
              src="/images/login-banner.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#9E2189] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <h2 className="text-4xl font-black mb-4 tracking-tighter">
                Artistry in Every Detail.
              </h2>
              <p className="text-white/80 font-medium">
                Join our community of refined living and exclusive artisanal
                collections.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-12 md:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#9E2189]/5 text-[#9E2189] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-block mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
              >
                Secure Access
              </motion.div>
              <h3 className="text-4xl font-black text-[#1A1A1A] tracking-tighter mb-2">
                Welcome to <span className="text-[#9E2189]">MAVA</span>
              </h3>
              <p className="text-default-500 font-medium italic">
                Enter your details to continue your journey.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!otpSent ? (
                <motion.div
                  key="mobile-input"
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-6"
                  exit={{ opacity: 0, x: -20 }}
                  initial={{ opacity: 0, x: 20 }}
                >
                  <Input
                    classNames={{
                      input: "text-lg font-medium",
                      label:
                        "text-xs font-black uppercase tracking-widest text-default-400",
                      inputWrapper:
                        "h-16 rounded-2xl border-2 border-default-100 hover:border-[#9E2189]/30 transition-all px-6",
                    }}
                    color={error ? "danger" : "default"}
                    errorMessage={error}
                    label="Mobile Number"
                    labelPlacement="outside"
                    placeholder="e.g. 9876543210"
                    type="tel"
                    value={mobileNumber}
                    onChange={handleMobileChange}
                  />
                  <button
                    className="h-16 w-full bg-[#9E2189] text-white rounded-2xl font-black text-lg shadow-2xl shadow-[#9E2189]/20 hover:shadow-[#9E2189]/40 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
                    disabled={loading}
                    onClick={handleLogin}
                  >
                    {loading ? "Initializing..." : "Send Verification Code"}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-input"
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-6"
                  exit={{ opacity: 0, x: -20 }}
                  initial={{ opacity: 0, x: 20 }}
                >
                  <div className="p-4 bg-[#FFC72C]/10 rounded-2xl border border-[#FFC72C]/20">
                    <p className="text-sm text-[#861C74] font-medium leading-relaxed">
                      We&apos;ve sent a 6-digit code to{" "}
                      <span className="font-bold underline">
                        {mobileNumber}
                      </span>
                      . Please verify your identity.
                    </p>
                  </div>
                  <Input
                    classNames={{
                      input: "text-2xl font-black tracking-[0.5em] text-center",
                      label:
                        "text-xs font-black uppercase tracking-widest text-default-400",
                      inputWrapper:
                        "h-20 rounded-2xl border-2 border-[#FFC72C]/30 hover:border-[#FFC72C] transition-all",
                    }}
                    color={error ? "danger" : "default"}
                    errorMessage={error}
                    label="Verification Code"
                    labelPlacement="outside"
                    maxLength={6}
                    placeholder="000000"
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                  <button
                    className="h-16 w-full bg-[#1A1A1A] text-white rounded-2xl font-black text-lg shadow-2xl hover:bg-[#9E2189] hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
                    disabled={loading}
                    onClick={handleVerifyOtp}
                  >
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </button>
                  <button
                    className="text-sm font-bold text-default-500 hover:text-[#9E2189] transition-colors decoration-[#9E2189] underline-offset-4 hover:underline"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                      setError("");
                    }}
                  >
                    Use a different number
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 pt-8 border-t border-divider">
              <p className="text-[10px] text-center text-default-400 font-bold uppercase tracking-[0.1em] leading-relaxed">
                By continuing, you agree to our&nbsp;
                <a className="text-[#9E2189] hover:underline" href="/terms">
                  Terms
                </a>
                &nbsp;and&nbsp;
                <a className="text-[#9E2189] hover:underline" href="/privacy">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </BaseLayout>
  );
};

export default Login;
