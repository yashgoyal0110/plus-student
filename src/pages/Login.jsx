import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigateTo = useNavigate();
  useEffect(() => {
    setIsButtonDisabled(!email || !password);
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      await axios
        .post(
          "https://plus-backendd.onrender.com/api/v1/user/login",
          { email, password, role: "Student" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/studentpage");
          setEmail("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/studentpage" />;
  }

  return (
    <div className="container form-component login-form">
      <h2 className="h2">Sign In</h2>
      <p>Please Login To Continue</p>
      <p>
        Welcome back! Log in to access your personalized learning dashboard,
        explore new courses, and track your progress.
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            className="registerNow"
            to="/register"
            style={{
              textDecoration: "underline",
              color: "#f76029",
            }}
          >
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button
            type="submit"
            disabled={loader || isButtonDisabled}
            style={{
              cursor: loader || isButtonDisabled ? "not-allowed" : "pointer",
              opacity: loader || isButtonDisabled ? 0.6 : 1,
            }}
          >
            {loader ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
