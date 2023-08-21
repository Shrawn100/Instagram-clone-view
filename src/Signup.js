import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name: displayName,
        username: username,
        password: password,
      });
      console.log(response.data);
      const { message, errors } = response.data;

      if (errors) {
        setErrors(errors);
        setMessage("");
      } else if (
        message === "Username already exists. Please pick another one."
      ) {
        setMessage(message);
      } else if (message === "Validation failed") {
        setErrors([]);
        setMessage("Please correct the validation errors.");
      } else if (message === "User registered successfully") {
        setErrors([]);
        setMessage("Signup successful");
        // You might want to perform any necessary action upon successful signup
        navigate("/"); // Redirect to "/login" page
      }
    } catch (error) {
      console.error("Signup request failed:", error);
    }
  };

  return (
    <div className="signup-page-container">
      <h1 className="signup-header">Create an account</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="displayName">Display name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={displayName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div className="signup-page-btns">
          <button type="submit">Sign Up</button>
        </div>

        {errors.length > 0 && (
          <ul className="errors-list-ul">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {message && <p className="error-msg-p">{message}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
