import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import bg from "../components/images/Music.jpg";
import {
  Grid,
  Box,
  Image,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function Login(props) {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();

    // Update field and state.
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Make POST request to your Lambda function
    axios
      .post("https://n9fp60qzyc.execute-api.us-east-1.amazonaws.com/Production/login", fields)
      .then((response) => {
        console.log(response);
  
        // Check if the response status code is 200 and the body contains the success message
        if (response.status === 200 && response.data.body ==="Login successful") {
          const userData = response.data.userData;
          // Call setUserDetails to update user state
          props.setUserDetails(userData);
          alert("Logged in successfully");
          navigate("/Main", { state: { username: userData.username, email: fields.email } });

        } else {
          // If login unsuccessful, display appropriate error message
          setErrorMessage("Email or password invalid");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
        setErrorMessage("Email or password invalid");
      });
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid
      templateRows="1fr"
      templateColumns="1fr"
      templateAreas='"main"'
      minHeight="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      {/* Background Image */}
      <Image
        src={bg}
        alt="Background Image"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        objectFit="cover"
        filter="blur(3.5px)"
        zIndex="-1"
      />

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        padding="20px"
        background="white"
        boxShadow="0 0 10px rgba(0, 1, 0.2, 0.2)"
        width="600px"
      >
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <p className="bold-text">Already Registered? Login Here!</p>{" "}
              <label htmlFor="email" className="control-label">
                Email-id
              </label>
              <input
                name="email"
                id="email"
                className="form-control"
                value={fields.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password
              </label>
              <InputGroup>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-control"
                  value={fields.password}
                  onChange={handleInputChange}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    icon={showPassword ? <VscEyeClosed /> : <VscEye />}
                    onClick={togglePasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            {errorMessage !== null && (
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
        <div>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "underline", color: "blue" }}>
              Register here
            </Link>
          </p>
        </div>
      </Box>
    </Grid>
  );

  //Test
}

export default Login;
