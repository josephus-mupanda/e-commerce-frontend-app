// @ts-nocheck

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../assets/images";
import Image from "../designLayouts/Image";

const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText }) => (
  <div className="jshop-hero-slide relative min-h-[540px] overflow-hidden">
    <Image imgSrc={imgSrc} className="absolute inset-0 h-full w-full object-cover" />
    <div className="jshop-hero-scrim absolute inset-0" />
    <div className="relative z-10 mx-auto flex min-h-[540px] max-w-container items-center px-6 py-16">
      <div className="max-w-3xl text-white">
        <span className="jshop-hud-label">J-Shop live kitchen</span>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          {text}
        </h1>
        <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/86 md:text-xl">
          {Subtext}
        </p>
        <div className="jshop-hero-actions mt-8 flex flex-wrap items-center gap-3">
          <Link to={buttonLink}>
            <button className="jshop-primary-button px-7 py-3 text-base font-black">
              {buttonText}
            </button>
          </Link>
          <span className="jshop-hero-chip">Fresh stock</span>
          <span className="jshop-hero-chip">Fast checkout</span>
        </div>
      </div>
    </div>
  </div>
);

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div className="absolute top-1/2 left-[7%] transform -translate-y-1/2">
        <ul className="m-0"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        {i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div className="absolute top-1/2 left-[2%] transform -translate-y-1/2">
              <ul className="m-0"> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: bannerImgOne,
      text: "Delicious Delights Delivered to Your Doorstep",
      Subtext:
        "Satisfy your cravings with our mouthwatering selection of gourmet dishes. Order now and experience convenience at your fingertips.",
      buttonLink: "/shop",
      buttonText: "Order Now",
    },
    {
      imgSrc: bannerImgTwo,
      text: "Our Culinary Journey",
      Subtext:
        "We are passionate about food. Discover the story behind our category and our dedication to delivering exceptional culinary experiences to your table.",
      buttonLink: "/shop",
      buttonText: "Order Now",
    },
    {
      imgSrc: bannerImgThree,
      text: "Get in Touch",
      Subtext:
        "Have questions or feedback? We'd love to hear from you! Contact our friendly team today and let us assist you with anything you need. Your satisfaction is our priority.",
      buttonLink: "/shop",
      buttonText: "Order Now",
    },
  ];
  
  return (
    <div className="jshop-hero w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import {
//   bannerImgOne,
//   bannerImgTwo,
//   bannerImgThree,
// } from "../../assets/images";
// import Image from "../designLayouts/Image";

// const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText }) => (
//   <div
//     style={{
//       position: "relative",
//       backgroundColor: "#F5F5F3", // Gray background color
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center", // Center vertically
//     }}
//   >
//     <div
//       style={{
//         maxWidth: "450px", // Adjust the maxWidth as needed
//         marginRight: "100px", // Add margin between text/button and image
//       }}
//     >
//       <h1
//         style={{
//           marginBottom: "15px",
//           fontSize: "2.5rem", // Adjust the font size as needed
//           color: "#000", // Black color
//           fontWeight: "700",
//         }}
//       >
//         {text}
//       </h1>
//       <p
//         style={{
//           marginBottom: "25px",
//           fontSize: "1.5rem", // Adjust the font size as needed
//           color: "#666", // Gray color
//         }}
//       >
//         {Subtext}
//       </p>

//       <Link to={buttonLink}>
//         <button className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white rounded-md text-lg font-bodyFont w-[185px] h-[50px] duration-300 font-bold">
//           {buttonText}
//         </button>
//       </Link>
//     </div>
//     <div style={{ marginLeft: "100px" }}>
//       <Image imgSrc={imgSrc} />
//     </div>
//   </div>
// );

// const Banner = () => {
//   const [dotActive, setDocActive] = useState(0);
//   const settings = {
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     adaptiveHeight: true,
//     arrows: false,
//     beforeChange: (prev, next) => {
//       setDocActive(next);
//     },
//     appendDots: (dots) => (
//       <div
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "7%",
//           transform: "translateY(-50%)",
//         }}
//       >
//         <ul style={{ margin: "0px" }}> {dots} </ul>
//       </div>
//     ),
//     customPaging: (i) => (
//       <div
//         style={
//           i === dotActive
//             ? {
//                 width: "30px",
//                 color: "#262626",
//                 borderRight: "3px #262626 solid",
//                 padding: "8px 0",
//                 cursor: "pointer",
//               }
//             : {
//                 width: "30px",
//                 color: "transparent",
//                 borderRight: "3px white solid",
//                 padding: "8px 0",
//                 cursor: "pointer",
//               }
//         }
//       >
//         0{i + 1}
//       </div>
//     ),
//     responsive: [
//       {
//         breakpoint: 576,
//         settings: {
//           dots: true,
//           appendDots: (dots) => (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "2%",
//                 transform: "translateY(-50%)",
//               }}
//             >
//               <ul style={{ margin: "0px" }}> {dots} </ul>
//             </div>
//           ),
//           customPaging: (i) => (
//             <div
//               style={
//                 i === dotActive
//                   ? {
//                       width: "25px",
//                       color: "#262626",
//                       borderRight: "3px #262626 solid",
//                       cursor: "pointer",
//                       fontSize: "12px",
//                     }
//                   : {
//                       width: "25px",
//                       color: "transparent",
//                       borderRight: "3px white solid",
//                       cursor: "pointer",
//                       fontSize: "12px",
//                     }
//               }
//             >
//               0{i + 1}
//             </div>
//           ),
//         },
//       },
//     ],
//   };

//   const slides = [
//     {
//       imgSrc: bannerImgOne,
//       text: "Delicious Delights Delivered to Your Doorstep",
//       Subtext:
//       "Satisfy your cravings with our mouthwatering selection of gourmet dishes. Order now and experience convenience at your fingertips.",
//       buttonLink: "/shop",
//       buttonText: "Order Now",
//     },
//     {
//       imgSrc: bannerImgTwo,
//       text: "Our Culinary Journey",
//       Subtext:
//       "We are passionate about food. Discover the story behind our category and our dedication to delivering exceptional culinary experiences to your table",
//       buttonLink: "/shop",
//       buttonText: "Order Now",
//     },
//     {
//       imgSrc: bannerImgThree,
//       text: "Get in Touch",
//       Subtext:
//       "Have questions or feedback? We'd love to hear from you! Contact our friendly team today and let us assist you with anything you need. Your satisfaction is our priorit",
//       buttonLink: "/shop",
//       buttonText: "Order Now",
//     },
//   ];
//   return (
//     <div className="w-full bg-white">
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <CustomSlide key={index} {...slide} />
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Banner;
