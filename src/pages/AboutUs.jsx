import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | Plus Learning Platform"}
        imageUrl={"blog2-removebg-preview.png"}
        p = {"At Plus Learning, we’re more than just an educational platform—we’re a community of passionate learners, educators, and innovators dedicated to redefining the way the world learns. Founded with the vision of making high-quality education accessible and effective, Plus Learning brings together a diverse team of experts, creators, and thought leaders who believe that learning should be inclusive, engaging, and empowering."}
      />
      <Biography imageUrl={"aboutUs-removebg-preview.png"} />
    </>
  );
};

export default AboutUs;