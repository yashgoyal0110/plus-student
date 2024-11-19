import { useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      await axios
        .post(
          "https://plus-backend.onrender.com/message/send", // url
          { firstName, lastName, email, phone, message }, // data to be send
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
    finally{
      setLoader(false);
    }
  };
  return (
    <>
      <div
        className="container form-component message-form"
        style={{ top: "20px" }}
      >
        <h2 style={{ bottom: "30px" }}>Have a doubt? Send a message to us</h2>
        <form onSubmit={handleMessage}>
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
          <textarea
            rows={7}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button
              type="submit"
              disabled={loader}
              style={{
                cursor: loader ? "not-allowed" : "pointer",
                opacity: loader ? 0.6 : 1,
              }} 
            >
              {loader ? "Wait..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageForm;
