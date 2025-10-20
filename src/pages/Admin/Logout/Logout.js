import React from "react";
import { motion } from "framer-motion";
import { emptyCart } from "../../../assets/images";
import { ADMIN_ROLE } from "../../../constants/config";
import withAuthorization from "../../../constants/hoc/withAuthorization";
const Logout = () => {
  
  return (
    <div className="max-w-container mx-auto px-4">
      <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          
        </motion.div>
    </div>
  );
};

export default withAuthorization(Logout,[ADMIN_ROLE]);
