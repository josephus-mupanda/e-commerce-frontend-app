import React, { useState, useEffect} from "react";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import Flex from "../../../components/designLayouts/Flex";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { BASE_URL,ADMIN_ROLE } from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";

const CustomTable = ({ data, onDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [userToView, setUserToView] = useState(null);

  const handleDelete = (id) => {
    setShowDeleteDialog(true);
    setUserToDelete(id);
  };

  const confirmDelete = () => {
    onDelete(userToDelete);
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleViewDetails = (user) => {
    setShowDetailsDialog(true);
    setUserToView(user);
  };

  const cancelView = () => {
    setShowDetailsDialog(false);
    setUserToView(null);
  };

  return (
    <div>
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end">
              <button
                onClick={confirmDelete}
                className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="w-20 h-8 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md mr-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsDialog && userToView && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">User Details</p>
            <p>ID: {userToView.id}</p>
            <p>Username: {userToView.username}</p>
            <p>Address: {userToView.address}</p>
            <p>Email: {userToView.email}</p>
            <p>Role: {userToView.role}</p>
            <div className="flex justify-end">
              <button
                onClick={cancelView}
                className="w-20 h-8 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    <div className="pb-20">
      <div className="hidden md:block">
        {/* Table for desktop */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((user) => (
              <tr key={user.id} className="text-sm text-gray-800">
                <td className="py-2 px-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.id}</div>
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.username}</div>
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.role}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(user)}
                    className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                  >
                    View
                  </button>
                  {/* <button
                    onClick={() => handleDelete(user.id)}
                    className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {/* Cards for tablets and phones */}
        {data.map((user) => (
          <div key={user.id} className="my-4 p-4 bg-white rounded-md border border-gray-300">
            <p className="text-sm font-medium text-gray-900">ID: {user.id}</p>
            <p className="text-sm text-gray-600">Username: {user.username}</p>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm text-gray-600">Role: {user.role}</p>
            <div className="mt-2 flex justify-start items-center">
              <button
                onClick={() => handleViewDetails(user)}
                className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
              >
                View
              </button>
              {/* <button
                onClick={() => handleDelete(user.id)}
                className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
              >
                Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
      {/* <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Username
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Role
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
            </th>
          </tr>
        </thead>
        <tbody  className="bg-white divide-y divide-gray-200">
          {data.map((user) => (
            <tr key={user.id} className="text-sm text-gray-800">
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.id}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.username}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.role}</div>
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <button
                  onClick={() => handleViewDetails(user)}
                  className="w-20 h-8 bg-green-100 hover:bg-green-200 text-green-800 rounded-md mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="w-20 h-8 bg-red-100 hover:bg-red-200 text-red-800 rounded-md mr-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

const UserManagement = () => {

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    // Fetch user data from the backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users`);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDelete = async (id) => {
    try {
      // Send delete request to backend API
      await axios.delete(`${BASE_URL}/api/users/delete/${id}`);
      // Remove the deleted user from the state
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };
  return (
    <div className="max-w-container mx-auto px-4 bg-[#F5F5F3]">
      <Breadcrumbs title="All Customers" />
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              placeholder="Search a customer here"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch className="w-5 h-5" />
          </div>
        </Flex>
      </div>
      {/* ================= Users Start here =================== */}
      <CustomTable data={filteredUsers} onDelete={handleDelete} />
      {/* ================= Users End here ===================== */}
    </div>
  );
};

export default withAuthorization(UserManagement,[ADMIN_ROLE]);

