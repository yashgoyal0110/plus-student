import { useNavigate } from "react-router-dom";
import "../App.css";
import { PiStudentFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";

function Front() {
  const navigateTo = useNavigate();

  function navigationHandle() {
    navigateTo("/login");
  }

  return (
    <>
      <div className="mainContainer">
        {/* Background Video */}
        <video className="background-video" autoPlay loop muted>
          <source src="/cyber-security-footage.mp4" type="video/mp4" />
        </video>

        <div className="contentBox">
         
          {/* Student Container */}
          <div className="studentContainer" onClick={() => navigationHandle()}>
            <div className="studentIcon">
              <PiStudentFill />
            </div>
            <p className="studentText">Login as Student</p>
          </div>

           {/* Admin Container */}
           <div className="adminContainer">
            <a
              href="https://plus-admin.vercel.app/login"
              target="_blank"
              className="adminIcon"
            >
              <RiAdminFill />
              <p className="adminText">Login as Admin</p>
            </a>
          </div>

        </div>
      </div>
    </>
  );
}

export default Front;
