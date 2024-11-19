import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // requires a loader
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Courses = () => {
  const navigateTo = useNavigate();
  const [courseArray, setCourseArray] = useState([]);

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

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlides: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlides: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlides: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlides: 1,
    },
  };

  const goToDetails = (id) => {
    navigateTo(`/details/${id}`);
  };

  return (
    <div className="container departments">
      <h2>Courses</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["medium", "small"]}
        autoPlay
        autoPlaySpeed={900}
        infinite
      >
        {courseArray.map((course, idx) => (
          <div
            className="card"
            key={idx}
            onClick={() => goToDetails(course._id)}
          >
            <div className="course-name">{course.title}</div>
            <img src={course.imageUrl} alt={course.title} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Courses;
