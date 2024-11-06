import SlotForm from "../components/SlotForm";
import Hero from "../components/Hero";
import Marquee from "react-fast-marquee";

const Slot = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Demo Class Here at Plus education Institute"}
        imageUrl={
          "stock-photo-calendar-with-magnifying-glass-isolated-on-white-background-d-illustration-737387413-removebg-preview.png"
        }
        p={
          "Ready to experience the Plus difference? Don’t miss out on the chance to join our exclusive demo class and get a firsthand look at our engaging, interactive approach to learning! Choose a slot that fits your schedule, and discover how our expert-led sessions, personalized guidance, and hands-on activities can accelerate your path to success"
        }
      />
      <div style={{paddingBottom: '80px'}}>
      <Marquee
        marqueeStyle={{ whiteSpace: "nowrap" }} 
        direction="left"
        speed={100} 
        gradient={true}
        gradientColor='green'
        gradientWidth={300}
      >
        <p style={{fontSize: "1.7rem", color: 'beige', whiteSpace: "nowrap"}}>
        Book Your Slot Now&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20% off on all courses&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get Plus Learning Goodies&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Book Your Slot Now&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20% off on all courses&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get Plus Learning Goodies&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
      </Marquee>
      </div>

      <SlotForm />
    </>
  );
};

export default Slot;
