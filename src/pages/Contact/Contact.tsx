// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import apiClient from "@/store/apiClient";
import { BASE_URL } from "../../constants/config";
import { toast } from "sonner";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state?.data ?? "");
  }, [location.state]);

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");
  const [loading, setLoading] = useState(false); 

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true); 
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
    if (!messages) {
      setErrMessages("Enter your Messages");
    }
    if (clientName && email && EmailValidation(email) && messages) {
      try {
        // Post data to the backend
        const response = await apiClient.post(`${BASE_URL}/api/contact`, {
            clientName: clientName,
            email: email ,
            message: messages
          }
        );
        if (response.status === 201) {
          toast.success(`Thank you dear ${clientName}, Your messages have been received successfully.`);
          setSuccessMsg(
            `Thank you dear ${clientName}, Your messages have been received successfully. Further details will be sent to you by email at ${email}.`
          );
        }
      } catch (error) {
        toast.error("There was an error sending the email!");
      }
      finally {
        setLoading(false); // Set loading to false after form submission
      }
    } else {
      setLoading(false); // Set loading to false if form validation fails
    }
    
  };

  return (
    <div className="jshop-page max-w-container mx-auto px-4">
      <Breadcrumbs title="Fill up the Form" prevLocation={prevLocation} />
      {successMsg ? (
        <p className="jshop-info-panel mb-20 max-w-xl p-6 font-medium text-green-600">{successMsg}</p>
      ) : (
        <div className="w-full lgl:w-1/2 mx-auto">
          {loading ? (
            <LoadingSpinner /> 
          ) : (
          <form className="w-full flex items-center justify-center">
            <div className="jshop-form-card w-full max-w-[540px] h-auto p-7 flex flex-col gap-6">
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Name
                </p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="text"
                  placeholder="Enter your name here"
                />
                {errClientName && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="email"
                  placeholder="Enter your name here"
                />
                {errEmail && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Messages
                </p>
                <textarea
                  onChange={handleMessages}
                  value={messages}
                  cols="30"
                  rows="3"
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                  type="text"
                  placeholder="Enter your name here"
                ></textarea>
                {errMessages && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errMessages}
                  </p>
                )}
              </div>
              <button
                onClick={handlePost}
                className="jshop-primary-button px-8 py-3 font-titleFont font-black text-lg"
              >
                Send
              </button>
            </div>
          </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Contact;
