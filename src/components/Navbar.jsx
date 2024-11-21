import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { FaUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { confirmAlert } from "react-confirm-alert"; // Import the confirmAlert method
import "react-confirm-alert/src/react-confirm-alert.css";


const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  // Logout handler with react-confirm-alert
  const handleLogout = () => {
    confirmAlert({
      title: "Confirm to log out",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await axios.get(
                "https://plus-backend.onrender.com/api/v1/user/student/logout",
                {
                  withCredentials: true,
                }
              );

              if (response.status === 200) {
                toast.success(response.data.message);
                setIsAuthenticated(false);
                navigateTo('/studentpage')
              }
            } catch (err) {
              toast.error(err.response?.data?.message || "Logout failed");
            }
          },
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            fontSize: "14px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          },
        },
        {
          label: "No",
          onClick: () => console.log("Logout canceled"),
          style: {
            backgroundColor: "#f44336",
            color: "white",
            padding: "8px 16px",
            fontSize: "14px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          },
        },
      ],
    });
  };
  //

  const goToLogin = () => {
    navigateTo("/");
  };

  const goToHome = () => {
    navigateTo("/studentpage");
  };

  const toastForLogin = () => {
    setShow(!show)
    if(!isAuthenticated){
    toast.error("Login to schedule demo");
    }
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Plus_logo.svg"
            alt="logo"
            className="logo-img"
            onClick={goToHome}
          />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link
              to={"/studentpage"}
              onClick={() => setShow(!show)}
              id={location.pathname === "/studentpage" ? "active" : ""}
            >
              Home
            </Link>
            
            <Link
              to={isAuthenticated ? "/slot" : "/login"}
              onClick={()=>toastForLogin()}
              id={location.pathname === "/slot" ? "active" : ""}
            >
              ScheduleDemo
            </Link>
            <Link
              to={"/about"}
              onClick={() => setShow(!show)}
              id={location.pathname === "/about" ? "active" : ""}
            >
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <div className="logoutBtnDiv" title="Logout">
              <button className="logoutBtn btn" onClick={handleLogout}>
                <IoLogOut />
              </button>
            </div>
          ) : (
            <div className="loginBtnDiv" title="Login" onClick={goToLogin}>
              <button className="loginBtn btn" onClick={goToLogin}>
                <FaUser style={{ fontSize: "25px", color: "#e5e5e5" }} />
              </button>
            </div>
          )}
        </div>
        <div
          className="hamburger"
          onClick={() => setShow(!show)}
          style={{ cursor: "pointer" }}
        >
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;


// import { useContext, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Context } from "../main";
// import { FaUser } from "react-icons/fa6";
// import { IoLogOut } from "react-icons/io5";
// import { confirmAlert } from "react-confirm-alert"; // Import the confirmAlert method
// import "react-confirm-alert/src/react-confirm-alert.css";

// const Navbar = () => {
//   const [show, setShow] = useState(false);
//   const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown state
//   const { isAuthenticated, setIsAuthenticated } = useContext(Context);
//   const navigateTo = useNavigate();
//   const location = useLocation();

//   // Logout handler with react-confirm-alert
//   const handleLogout = () => {
//     confirmAlert({
//       title: "Confirm to log out",
//       message: "Are you sure you want to log out?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: async () => {
//             try {
//               const response = await axios.get(
//                 "https://plus-backend.onrender.com/api/v1/user/student/logout",
//                 {
//                   withCredentials: true,
//                 }
//               );

//               if (response.status === 200) {
//                 toast.success(response.data.message);
//                 setIsAuthenticated(false);
//               }
//             } catch (err) {
//               toast.error(err.response?.data?.message || "Logout failed");
//             }
//           },
//         },
//         {
//           label: "No",
//           onClick: () => console.log("Logout canceled"),
//         },
//       ],
//     });
//   };

//   const goToLogin = () => {
//     navigateTo("/login");
//   };

//   const goToAdminLogin = () => {
//     window.open("https://plus-admin.vercel.app/login", "_blank");
//   };

//   const goToHome = () => {
//     navigateTo("/");
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   return (
//     <>
//       <nav className={"container"}>
//         <div className="logo">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Plus_logo.svg"
//             alt="logo"
//             className="logo-img"
//             onClick={goToHome}
//           />
//         </div>
//         <div className={show ? "navLinks showmenu" : "navLinks"}>
//           <div className="links">
//             <Link
//               to={"/"}
//               onClick={() => setShow(!show)}
//               id={location.pathname === "/" ? "active" : ""}
//             >
//               Home
//             </Link>
//             <Link
//               to={"/slot"}
//               onClick={() => setShow(!show)}
//               id={location.pathname === "/slot" ? "active" : ""}
//             >
//               ScheduleDemo
//             </Link>
//             <Link
//               to={"/about"}
//               onClick={() => setShow(!show)}
//               id={location.pathname === "/about" ? "active" : ""}
//             >
//               About Us
//             </Link>
//           </div>
//           {isAuthenticated ? (
//             <div className="logoutBtnDiv" title="Logout">
//               <button className="logoutBtn btn" onClick={handleLogout}>
//                 <IoLogOut />
//               </button>
//             </div>
//           ) : (
//             <div className="loginBtnDiv" title="Login" style={{ position: "relative" }}>
//               <button className="loginBtn btn" onClick={toggleDropdown}>
//                 <FaUser style={{ fontSize: "25px", color: "#e5e5e5" }} />
//               </button>
//               {dropdownVisible && (
//                 <div
//                   className="dropdown-menu"
//                   style={{
//                     position: "absolute",
//                     top: "100%",
//                     left: "0",
//                     backgroundColor: "#fff",
//                     border: "1px solid #ccc",
//                     borderRadius: "4px",
//                     padding: "10px",
//                     zIndex: 1000,
//                   }}
//                 >
//                   <button
//                     className="dropdown-item btn"
//                     onClick={goToLogin}
//                     style={{
//                       display: "block",
//                       margin: "5px 0",
//                       width: "100%",
//                       textAlign: "left",
//                       padding: "8px",
//                     }}
//                   >
//                     Student
//                   </button>
//                   <button
//                     className="dropdown-item btn"
//                     onClick={goToAdminLogin}
//                     style={{
//                       display: "block",
//                       margin: "5px 0",
//                       width: "100%",
//                       textAlign: "left",
//                       padding: "8px",
//                     }}
//                   >
//                     Admin
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         <div
//           className="hamburger"
//           onClick={() => setShow(!show)}
//           style={{ cursor: "pointer" }}
//         >
//           <GiHamburgerMenu />
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
