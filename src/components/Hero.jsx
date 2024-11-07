const Hero = ({title, imageUrl ,p}) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
        {p}
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl}alt="hero" className="animated-image"></img>
        <span>
          <img src="/Vector.png" alt="vector"></img>
        </span>
      </div>
    </div>
  )
}

export default Hero