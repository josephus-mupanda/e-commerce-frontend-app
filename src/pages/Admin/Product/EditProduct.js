import React, { useState,useEffect } from "react";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import { toast } from "react-toastify";
import imageCompression from 'browser-image-compression';
import {  useNavigate,useParams } from "react-router-dom"; 
import axios from "axios";
import { BASE_URL,ADMIN_ROLE } from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";

const EditProduct = () => {
  const { id } = useParams(); // Extract product ID from URL params

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [errCategory, setErrCategory] = useState("");
  const [errName, setErrName] = useState("");
  const [errPrice, setErrPrice] = useState("");
  const [errQuantity, setErrQuantity] = useState("");
  const [errDescription, setErrDescription] = useState("");
  const [errImage, setErrImage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate(); // Hook for navigation
 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/products/${id}`);
        const product = response.data; // Assuming response.data contains product details

        // Populate product details
        setCategory(product.category.id);
        setName(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
        setDescription(product.description);
        setImage(product.image);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Error fetching product details. Please try again later.");

        navigate("/admin/product"); // Navigate back to product management page
      }
    };

    fetchProductDetails();
  }, [id, navigate]);

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setErrCategory("");
  };

  const handleName = (e) => {
    setName(e.target.value);
    setErrName("");
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
    setErrPrice("");
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
    setErrQuantity("");
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    setErrDescription("");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Options for image compression
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);

        // Convert compressed file to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result;
          const base64Index = imageData.indexOf("base64,") + "base64,".length;
          const imageBytes = imageData.substring(base64Index);
          setImage(imageBytes);
        };
        reader.readAsDataURL(compressedFile);
        setErrImage("");
      } catch (error) {
        console.error("Error while compressing image:", error);
        setErrImage("Failed to upload image. Please try again.");
      }
    }
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const imageData = reader.result;
  //       const base64Index = imageData.indexOf("base64,") + "base64,".length;
  //       const imageBytes = imageData.substring(base64Index);
  //       setImage(imageBytes);
  //     };
  //     reader.readAsDataURL(file);
  //     setErrImage("");
  //   }
  // };

  const handleUpdateProduct = async(e) => {
    e.preventDefault();

    // Validation
    let valid = true;

    if (!category) {
      setErrCategory("Select a category");
      valid = false;
    }

    if (!name) {
      setErrName("Enter product name");
      valid = false;
    }

    if (!price) {
      setErrPrice("Enter product price");
      valid = false;
    }

    if (!quantity) {
      setErrQuantity("Enter product quantity");
      valid = false;
    }

    if (!description) {
      setErrDescription("Enter product description");
      valid = false;
    }

    if (!image) {
      setErrImage("Upload product image");
      valid = false;
    }

    if (valid) {
      try {
        const formData = {
          name: name,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          description: description,
          category: {
            id: category,
            user: {
              id: sessionStorage.getItem("sessionId"),
            },
          },
          image: image,
        };

        await axios.put(`${BASE_URL}/api/admin/products/update/${id}`, formData);

        toast.success(`Product "${name}" updated successfully.`);

        setCategory("");
        setName("");
        setPrice("");
        setQuantity("");
        setDescription("");
        setImage("");

        navigate("/admin/product");
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while updating the product.");
      }
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <div className="mb-4">
        <Breadcrumbs title="Update product" />
      </div>

      <div className="w-full lgl:w-1/2 mx-auto">
        <form className="w-full flex items-center justify-center">
          <div className="px-6 py-0 w-full h-auto flex flex-col justify-center">
            <div className="flex flex-col gap-3">
              {/* Category */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Category
                </p>
                <select
                  onChange={handleCategory}
                  value={category}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errCategory && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errCategory}
                  </p>
                )}
              </div>

              {/* Name */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Product Name
                </p>
                <input
                  onChange={handleName}
                  value={name}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="Enter product name"
                />
                {errName && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errName}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Price
                </p>
                <input
                  onChange={handlePrice}
                  value={price}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="number"
                  placeholder="Enter product price"
                />
                {errPrice && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPrice}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Quantity
                </p>
                <input
                  onChange={handleQuantity}
                  value={quantity}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="number"
                  placeholder="Enter product quantity"
                />
                {errQuantity && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errQuantity}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Description
                </p>
                <textarea
                  onChange={handleDescription}
                  value={description}
                  className="w-full h-20 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none resize-none"
                  placeholder="Enter product description"
                ></textarea>
                {errDescription && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errDescription}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Upload Image
                </p>
                <input
                  onChange={handleImageUpload}
                  className="hidden"
                  type="file"
                  accept="image/*"
                  id="upload-image"
                />
                <label
                  htmlFor="upload-image"
                  className="w-full h-8 bg-blue-500 text-white text-center rounded-md cursor-pointer flex justify-center items-center"
                >
                  Upload Image
                </label>
                {errImage && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errImage}
                  </p>
                )}
                {image && (
                  <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt="Uploaded Product"
                  className="w-20 h-20 mt-2 rounded-md"
                />
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleUpdateProduct}
                className="bg-[#FF8533] hover:bg-[#FF6A00] text-white  hover:text-white  cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                Update Product
              </button>
              <br/><br/>
             
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuthorization(EditProduct,[ADMIN_ROLE]);
