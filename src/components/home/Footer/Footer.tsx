// @ts-nocheck
import React, { useState ,useEffect,useContext } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { Link } from "react-router-dom";
import apiClient from "@/store/apiClient";
import { BASE_URL } from "../../../constants/config";
import { AppContext } from "@/contexts/AppContext";
const Footer = () => {
  const { categories} = useContext(AppContext);
  
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // const [categories, setCategories] = useState([]);


  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await apiClient.get(`${BASE_URL}/api/customer/categories`);
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //       // Handle error
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="jshop-footer w-full py-16 px-4">
      <div className="jshop-footer-panel max-w-container mx-auto grid grid-cols-1 gap-8 p-5 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <FooterListTitle title=" More about J-Shop" />
          <div className="flex flex-col gap-6">
            {/* <p className="text-base w-full xl:w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sint
              ab ullam, numquam nesciunt in.
            </p> */}
            <ul className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/josephus.mupanda/?igsh=NmVpZWVwdnoxeWFy"
                target="_blank"
                rel="noreferrer"
              >
                <li className="jshop-social-icon">
                  <FaInstagram />
                </li>
              </a>
              <a
                href="https://github.com/josephus-mupanda"
                target="_blank"
                rel="noreferrer"
              >
                <li className="jshop-social-icon">
                  <FaGithub />
                </li>
              </a>
              <a
                href="https://x.com/JosephusMupanda?t=pRC81W0LXvIi7yQQYZoWqg&s=09"
                target="_blank"
                rel="noreferrer"
              >
                <li className="jshop-social-icon">
                  <FaTwitter />
                </li>
              </a>
              <a
                href="https://www.linkedin.com/in/josephus-mupanda-3836131b4/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="jshop-social-icon">
                  <FaLinkedin />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div>
          <FooterListTitle title="Categories" />
          <ul className="flex flex-col gap-2">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.name}`}>
                <li
                  key={category.id}
                  className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
                >
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <FooterListTitle title="Your account" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Profile
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Orders
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              About
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Contact
            </li>
          
          </ul>
        </div>
        <div className="xl:col-span-2 flex flex-col items-start w-full">
          <FooterListTitle title="Subscribe to our newsletter." />
          <div className="w-full">
            <p className="text-left mb-4">
            Subscribe to our newsletter to receive exclusive offers, latest updates, and exciting news!
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                <p className="text-lg text-gray-700 font-semibold mb-2">Thank you for subscribing!</p>
                <p className="text-base text-gray-600">You are now subscribed to our newsletter. Get ready to receive the latest updates, news, and promotions straight to your inbox.</p>
  
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-stretch xl:items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="glass-control w-full h-12 px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Insert your email ...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="jshop-primary-button w-full xl:w-auto h-12 px-6 text-base font-black"
                >
                  Subscribe
                </button>
              </div>
            )}

            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${
                subscription ? "mt-2" : "mt-6"
              }`}
              imgSrc={paymentCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
