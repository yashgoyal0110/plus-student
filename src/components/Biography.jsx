const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" className="animated-image"></img>
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We are?</h3>
        <p>
        At Plus Learning, we’re more than just an educational platform—we’re a community of passionate learners, educators, and innovators dedicated to redefining the way the world learns. Founded with the vision of making high-quality education accessible and effective, Plus Learning brings together a diverse team of experts, creators, and thought leaders who believe that learning should be inclusive, engaging, and empowering.
        </p>
        <p>Join us as we continue to evolve, inspire, and create impact.</p>
        <p>we’re shaping a world where learning knows no limits.</p>
        <p>
        Through carefully curated courses, expert-led live sessions, and hands-on projects, we’re helping learners build real-world skills and confidently step toward their aspirations.
        </p>
        <p>
        We aim to bridge the gap between traditional education and the future of learning by offering innovative, interactive, and personalized experiences for students
        </p>
      </div>
    </div>
  );
};

export default Biography;
