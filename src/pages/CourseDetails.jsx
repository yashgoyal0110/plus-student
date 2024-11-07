import { useParams } from "react-router-dom";
import "../courseDetails.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"

const CourseDetails = () => {
  const { id } = useParams();
  const [courseArray, setCourseArray] = useState([]);
  const [student, setStudent] = useState({});
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          "https://plus-backend.onrender.com/api/v1/course/allcourses",
          { withCredentials: true }
        );
        setCourseArray(data.courses);
        setLoading(false); 
      } catch (error) {
        console.log(error.response.data.message);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios
          .get("https://plus-backend.onrender.com/api/v1/user/student/me", {
            withCredentials: true,
          })
          .then(() => {
            setIsAuthenticated(true);
            setStudent(data.user);
          });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchStudent();
  }, [isAuthenticated]);

  const reqCourse = courseArray.find((course) => course._id === id);

  // Razorpay *************************************************************************************

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigateTo("/login");
      toast.error("Student is not logged in");
      return;
    }

    if (reqCourse && reqCourse.price) {
      try {
        const amount = reqCourse.price;
        const currency = "INR";
        const receiptId = "qwsaq1";

        const response = await fetch(
          "https://plus-backend.onrender.com/api/v1/purchase/buy",
          {
            method: "POST",
            body: JSON.stringify({
              amount: amount * 100, // Razorpay expects amount in the smallest currency unit
              currency,
              receipt: receiptId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const order = await response.json();

        const options = {
          key: "rzp_test_3GdDaiXr1ys5AO",
          amount: amount * 100, // Convert to cents or paise
          currency,
          name: "Plus Learning",
          description: "Test Transaction",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/9/9a/Plus_logo.svg",
          order_id: order.id,
          handler: async function (response) {
            // Process the payment success callback
            toast.success("Payment successful!");
          },
          prefill: {
            name: student.firstName,
            email: student.email,
            contact: student.phone,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          toast.error("Payment failed. Please try again.");
          console.log(response.error);
        });
        rzp1.open();
      } catch (error) {
        console.error("Error initiating payment:", error);
        toast.error("Error initiating payment. Please try again.");
      }
    }
  };

  // Razorpay *************************************************************************************

  if (loading) {
    return (
      <div
            className="loading-container"
            style={{
              position: 'relative',
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <ClipLoader
              size={100}
              color={"#e35108f2"}
              loading={loading}
              cssOverride={{
                display: "block",
                marginTop: "200px",
                borderWidth: "5px",
              }}
            />
          </div>
    );
  }

  return (
    <div className="outerDiv">
      {reqCourse && (
        <>
          <div className="detailCard leftCourse">
            <img
              src={reqCourse.imageUrl}
              alt={reqCourse.title}
              className="detailImage"
            />
            <div className="courseContent">
              <h2 className="courseName">{reqCourse.title}-1</h2>
              <p className="instructorName">
                Instructor: {reqCourse.instructor}
              </p>
              <p className="courseCode" style={{ fontSize: "16px" }}>
                Course code: {reqCourse.code}
              </p>
              <p className="detail">
                <strong>Price:</strong> {`${reqCourse.price} ₹`}
              </p>
              <p className="detail">
                <strong>Duration:</strong> {`${reqCourse.duration} months`}
              </p>
              <p className="detail">
                <strong>Mode:</strong> {reqCourse.mode}
              </p>
              <p className="detail">
                <strong>Validity:</strong> {reqCourse.validity}
              </p>
              <button
                className="buyNowButton"
                onClick={(e) => paymentHandler(e)}
              >
                <strong>Buy Now</strong>
              </button>
            </div>
          </div>

          <div className="iframeContainer">
            <iframe
              className="videoFrame topFrame"
              src={reqCourse.embedLink1}
              title="Course Video 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <iframe
              className="videoFrame bottomFrame"
              src={reqCourse.embedLink2}
              title="Course Video 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="detailCard rightCourse">
            <img
              src={reqCourse.imageUrl}
              alt={reqCourse.title}
              className="detailImage"
            />
            <div className="courseContent">
              <h2 className="courseName">{reqCourse.title}-2</h2>
              <p className="instructorName">
                Instructor: {reqCourse.instructor}
              </p>
              <p className="courseCode" style={{ fontSize: "16px" }}>
                Course code:{" "}
                {`${reqCourse.code}${Math.floor(
                  Math.random() * 10 
                ).toString()}`}
              </p>
              <p className="detail">
                <strong>Price:</strong> {`${reqCourse.price * 10} ₹`}
              </p>
              <p className="detail">
                <strong>Duration:</strong> {`${reqCourse.duration} months`}
              </p>
              <p className="detail">
                <strong>Mode:</strong> {reqCourse.mode}
              </p>
              <p className="detail">
                <strong>Validity:</strong> {reqCourse.validity}
              </p>
              <button
                className="buyNowButton"
                onClick={(e) => paymentHandler(e, reqCourse._id)}
              >
                <strong>Buy Now</strong>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetails;
