import Hero from "../components/Hero";
import Courses from "../components/Courses";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to Plus Learning Platform | Your Trusted Education Partner"
        }
        imageUrl={"1700054275565-removebg-preview.png"}
        p = {"Welcome to Plus Learning, where we empower you to reach your full potential! At Plus, we’re passionate about creating a seamless, interactive, and personalized learning experience that’s accessible to everyone, everywhere. Our platform brings together top-quality courses, dynamic live sessions, and engaging resources from leading educators and industry experts around the globe"}
      />
      <Biography imageUrl={"little-3d-guy-writing-notebook-23531502-removebg-preview.png"} />
      <Courses />
      <MessageForm />
    </>
  );
};

export default Home;
