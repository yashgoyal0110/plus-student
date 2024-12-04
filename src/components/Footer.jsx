import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Footer = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        await axios
          .get("https://plus-backend.onrender.com/api/v1/user/student/me", {
            withCredentials: true,
          })
          .then(() => {
            setIsAuthenticated(true);
          });
      } catch (error) {
        return error.message;
      }
    };
    fetchStudent();
  }, [isAuthenticated]);
  const toastForLogin = () => {
    if (!isAuthenticated) {
      toast.error("Login to schedule demo");
    }
  };
  const navigateTo = useNavigate();
  const goToHome = () => {
    navigateTo("/studentpage");
  };
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Plus_logo.svg"
              alt="logo"
              className="logo-img"
              onClick={goToHome}
            />
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/studentpage"}>Home</Link>
              <Link
                to={isAuthenticated ? "/slot" : "/login"}
                onClick={() => toastForLogin()}
              >
                Schedule Demo
              </Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          <div>
            <h4>Office Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span className="contactDetails">999-999-9999</span>
            </div>
            <div>
              <MdEmail />
              <span className="contactDetails">xyz@mail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span className="contactDetails">Delhi, India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
