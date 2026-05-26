// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "@/store/apiClient";
import { toast } from "sonner";
import { BASE_URL } from "../../constants/config";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import Header from "../../components/home/Header/Header";
import OtpInput from "@/components/auth/OtpInput";

const ConfirmationPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const email =
    location.state?.email || new URLSearchParams(location.search).get("email");

  const confirmUserEmail = useCallback(async (code) => {
    setLoading(true);
    try {
      await apiClient.post(`${BASE_URL}/api/auth/confirm?code=${code}`);
      setMessage("Email confirmed successfully. You can now login.");
      toast.success("Email confirmed successfully. You can now login.");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      console.error("Error confirming email:", error);
      setMessage("Invalid or expired OTP. Please try again.");
      toast.error("Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code") || params.get("token");
    if (code && /^\d{6}$/.test(code)) {
      setOtp(code);
      confirmUserEmail(code);
    }
  }, [confirmUserEmail, location.search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter the 6-digit OTP code.");
      return;
    }
    confirmUserEmail(otp);
  };

  return (
    <div className="jshop-auth-page">
        <Header />
        <div className="jshop-auth-screen w-full min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-10">
        <div className="w-full lgl:w-1/2 h-full">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <form onSubmit={handleSubmit} className="jshop-auth-form w-full lgl:w-[500px] flex items-center justify-center">
              <div className="jshop-auth-card p-8 text-center">
                <h1 className="font-titleFont text-2xl font-black text-primeColor">
                  Verify email
                </h1>
                <p className="mt-2 text-sm text-lightText">
                  Enter the 6-digit OTP sent to {email || "your email"}.
                </p>
                <div className="mt-6">
                  <OtpInput value={otp} onChange={setOtp} />
                </div>
                {message && <p className="mt-4 text-sm font-semibold text-primeColor">{message}</p>}
                <button
                  type="submit"
                  className="jshop-primary-button mt-6 h-11 w-full text-base font-black"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    );
};

export default ConfirmationPage;
