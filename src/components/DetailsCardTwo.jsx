function DetailsCardOne({ reqCourse, paymentHandler }) {
  return (
    <>
      <img
        src={reqCourse.imageUrl}
        alt={reqCourse.title}
        className="detailImage"
      />
      <div className="courseContent">
        <h2 className="courseName">{reqCourse.title}-2</h2>
        <p className="instructorName">Instructor: {reqCourse.instructor}</p>
        <p className="courseCode" style={{ fontSize: "16px" }}>
          Course code: {reqCourse.code}Y
        </p>
        <p className="detail">
          <strong>Price:</strong> {`${reqCourse.price * 10} ₹`}
        </p>
        <p className="detail">
          <strong>Duration:</strong> {`${parseInt(reqCourse.duration) + 3} months`}
        </p>
        <p className="detail">
          <strong>Mode:</strong> {reqCourse.mode}
        </p>
        <p className="detail">
          <strong>Validity:</strong> {reqCourse.validity}
        </p>
        <button className="buyNowButton" onClick={(e) => paymentHandler(e)}>
          <strong>Buy Now</strong>
        </button>
      </div>
    </>
  );
}

export default DetailsCardOne;
