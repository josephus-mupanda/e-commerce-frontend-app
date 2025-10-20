import React, { useState } from "react";
import AdminHeader from "./AdminHeader/AdminHeader";

// import { Route, Switch } from "react-router-dom";

const AdminDashboard = () => {

    // State to keep track of the selected menu item
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to handle selection of menu item
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex">

       {/* Render the admin sidebar */}
       <AdminHeader onMenuItemClick={handleMenuItemClick} />
      
      {/* Render the content based on the selected item */}
      <div className="ml-40 p-4">
        {selectedItem && (
          <h1 className="text-2xl font-semibold">{selectedItem.title} Page</h1>
        )}
    
      </div>
      
    </div>
  );
};

export default AdminDashboard;
