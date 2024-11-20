import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function Front() {
    const navigateTo = useNavigate();
    function navigationHandle(){
        navigateTo('/login')
    }
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.1 },
  };

  return (
    <motion.div
      className="mainContainer"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.a
        href="https://plus-admin.vercel.app/login"
        target="_blank"
        className="adminContainer"
        variants={itemVariants}
        whileHover="hover"
        style={{
          textDecoration: "none",
          color: "white",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          width: "80px",
          backgroundColor: "orangered",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Admin
      </motion.a>
      <motion.div
        className="studentContainer"
        onClick={() => navigationHandle()}
        variants={itemVariants}
        whileHover="hover"
        style={{
          textDecoration: "none",
          color: "white",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          width: "80px",
          backgroundColor: "green",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Student
      </motion.div>
    </motion.div>
  );
}

export default Front;
