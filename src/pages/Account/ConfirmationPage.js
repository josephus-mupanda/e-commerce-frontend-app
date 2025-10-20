import React, { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/config";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import Header from "../../components/home/Header/Header";

const ConfirmationPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    const confirmUserEmail = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/users/confirm?token=${token}`
        );

        if (response.data.message === "Email confirmed successfully") {
          setMessage("Email confirmed successfully. You can now login.");
          toast.success("Email confirmed successfully. You can now login.");
          setTimeout(() => navigate("/signin"), 3000);
        } else {
          setMessage("Invalid or expired token. Please try again.");
          toast.error("Invalid or expired token. Please try again.");
          setTimeout(() => navigate("/signup"), 3000);
        }
      } catch (error) {
        console.error("Error confirming email:", error);
        setMessage("An error occurred. Please try again later.");
        toast.error("An error occurred. Please try again later.");
        setTimeout(() => navigate("/signup"), 3000);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to confirm user's email when component mounts
    if (token) {
      confirmUserEmail();
    } else {
      setMessage("Invalid confirmation link.");
      setLoading(false);
    }
  }, [location.search,navigate]);

  return (
    <div>
        <Header />
        <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full lgl:w-1/2 h-full">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold">{message}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
    );
};

export default ConfirmationPage;
