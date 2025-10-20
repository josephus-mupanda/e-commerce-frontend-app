// src/context/AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/config';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [categories, setCategories] = useState([]);
  const [adminCategories, setAdminCategories] = useState([]);

  const [product, setProducts] = useState([]);
  
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [filteredAdminOrders, setFilteredAdminOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState(null);

 


  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/customer/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchAdminCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/categories`);
        setAdminCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      //setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/customer/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/payments`);
        setPayments(response.data);
        //setFilteredPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error.message);
    
      }
    };

    // Function to fetch orders
  const fetchOrders = async () => {
    setOrderLoading(true);
    try {
      const userId = sessionStorage.getItem('sessionId');
      const response = await axios.get(`${BASE_URL}/api/customer/orders/user/${userId}`);
      setOrders(response.data);
      setOrderLoading(false);
    } catch (error) {
      setError(error.message);
      setOrderLoading(false);
    }
  };

    const fetchAdminOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/orders`);
        setAdminOrders(response.data);
        setFilteredAdminOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
  


    fetchCategories();
    fetchAdminCategories();

    fetchProducts();
    fetchPayments();

    fetchOrders();
    fetchAdminOrders();

  }, []);

  return (
    <AppContext.Provider value={{

        categories,
        adminCategories, 
        product, 
        payments,
        orders,
        adminOrders,
        filteredAdminOrders,

        orderLoading,
        loading ,
        error

        }}
    >
      {children}
    </AppContext.Provider>
  );
};
