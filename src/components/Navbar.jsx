import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { FaUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await axios
      .get("https://plus-backend.onrender.com/api/v1/user/student/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if(res.status === 200) {
          console.log(JSON.stringify(res));
          toast.success(res.data.message);
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };


  const goToLogin = () => {
    navigateTo("/login");
  };

  const goToHome = () => {
    navigateTo("/");
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
              to={"/"}
              onClick={() => setShow(!show)}
              id={location.pathname === "/" ? "active" : ""}
            >
              Home
            </Link>
            <Link
              to={"/slot"}
              onClick={() => setShow(!show)}
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
            <div className="loginBtnDiv" title="Login">
              <button className="loginBtn btn" onClick={goToLogin}>
               <FaUser  style={{ fontSize: "25px", color: "#e5e5e5",  }}/>
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
