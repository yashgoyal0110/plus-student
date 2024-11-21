import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const SlotForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [slotDate, setSlotDate] = useState("");
  const [course, setCourse] = useState("Web Dev");
  const [instructorFirstName, setInstructorFirstName] = useState("");
  const [instructorLastName, setInstructorLastName] = useState("");
  const [comment, setComment] = useState("");
  const [whatsapp, setWhatsapp] = useState(false);
  const [courseArray, setCourseArray] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          "https://plus-backend.onrender.com/api/v1/course/allcourses",
          { withCredentials: true }
        );
        setCourseArray(data.courses);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchCourses();
  }, []);

  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    const fetchInstructors = async () => {
      const { data } = await axios.get(
        "https://plus-backend.onrender.com/api/v1/user/instructors",
        { withCredentials: true }
      );
      setInstructors(data.instructors);
    };
    fetchInstructors();
  }, []);
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

  const isSlotDateValid = (slotDate) => {
    const selectedDate = new Date(slotDate);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    return selectedDate >= today && selectedDate <= maxDate;
  };

  //
  const handleSlot = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const whatsappBool = Boolean(whatsapp);
      const { data } = await axios.post(
        "https://plus-backend.onrender.com/api/v1/slot/post",
        {
          firstName,
          lastName,
          email,
          phone,
          referalCode,
          dob,
          gender,
          slot_date: slotDate,
          course,
          instructor_firstName: instructorFirstName,
          instructor_lastName: instructorLastName,
          whatsapp: whatsappBool,
          comment,
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
      if (!isSlotDateValid(slotDate)) {
        toast.error(
          "Slot date must be within the next 30 days and cannot be in the past."
        );
        return;
      }
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setReferalCode(""),
        setDob(""),
        setGender(""),
        setSlotDate(""),
        setCourse(""),
        setInstructorFirstName(""),
        setInstructorLastName(""),
        setWhatsapp(""),
        setComment("");
      
    } catch (error) {
      toast.error(error.response.data.message || "Can't book slot");
    }
    finally{
      setLoader(false);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2 className="h2">Schedule Demo</h2>
        <form onSubmit={handleSlot}>
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
              type="date"
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
              <option value="Custom">Custom</option>
            </select>
            <input
              type="date"
              placeholder="Slot Date"
              value={slotDate}
              onChange={(e) => setSlotDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                setInstructorFirstName("");
                setInstructorLastName("");
              }}
            >
              <option value="">Select Course</option>
              {courseArray.map((course) => {
                return (
                  <option value={course.title} key={course._id}>
                    {course.title}
                  </option>
                );
              })}
            </select>
            <select
              value={`${instructorFirstName} ${instructorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setInstructorFirstName(firstName);
                setInstructorLastName(lastName);
              }}
              disabled={!course}
            >
              <option value="">Select Instructor</option>
              {instructors
                .filter((instructor) => instructor.instructorCourse === course)
                .map((instructor, index) => (
                  <option
                    value={`${instructor.firstName} ${instructor.lastName}`}
                    key={index}
                  >
                    {instructor.firstName} {instructor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment(optional)"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Want to recive whatsapp updates?</p>
            <input
              type="checkbox"
              checked={whatsapp}
              onChange={(e) => setWhatsapp(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button
            disabled={loader}
            style={{
              margin: "0 auto",
              cursor: loader ? "not-allowed" : "pointer",
              opacity: loader ? 0.6 : 1,
            }}
          >
            {loader ? "WAIT..." : "CONFIRM SLOT"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SlotForm;
