import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated} = useContext(Context); 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);


  const navigateTo = useNavigate();

  //

  const isOldEnough = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const ageMonthCheck = new Date().getMonth() - birthDate.getMonth();
    const ageDayCheck = new Date().getDate() - birthDate.getDate();

    return (
      age > 12 ||
      (age === 12 &&
        (ageMonthCheck > 0 || (ageMonthCheck === 0 && ageDayCheck >= 0)))
    );
  };

  //

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post(
        "https://plus-backend.onrender.com/user/student/register",
        {
          firstName,
          lastName,
          email,
          phone,
          referalCode,
          dob,
          gender,
          password,
          role: "Student",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );


      if (!isOldEnough(dob)) {
        toast.error("You must be at least 12 years old to register.");
        return;
      }

      toast.success(res.data.message);
      navigateTo("/login");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setReferalCode("");
      setDob("");
      setGender("");
      setPassword("");

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoader(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="container form-component register-form">
        <h2 className="h2">Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Join us today and unlock a world of limitless learning possibilities!
          By signing up, you’ll gain access to our extensive library of courses.
        </p>
        <form onSubmit={handleRegistration}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Referal Code(optional)"
              value={referalCode}
              onChange={(e) => setReferalCode(e.target.value)}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/login"}
              style={{ textDecoration: "underline", color: "#f85d16" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button
              type="submit"
              disabled={loader}
              style={{
                cursor: loader ? "not-allowed" : "pointer",
                opacity: loader ? 0.6 : 1,
              }}
            >
              {loader ? "Wait..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
