import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import bg from "../components/images/Music.jpg";
import { Grid, GridItem, Box, Image } from "@chakra-ui/react";

function Form(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
   
  });
  //const [user] = useState({});
  const userData = {
    email: user.email,
    userName: user.userName,
    password: user.password
  };

  const [errors] = useState({});

  
  const handleSubmit = (event) => {
    event.preventDefault();
   

     axios
     .post('https://n9fp60qzyc.execute-api.us-east-1.amazonaws.com/Production/register', 
          { body: JSON.stringify(userData) }, // Wrap user data in 'body' key
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
     
     
    .then((response) => {
      console.log(response);

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      // Check the response status and handle accordingly
      if (response.data.statusCode === 200) {
        if (response.data.body === "\"User registered successfully\"") {
            alert("Form submitted successfully");
            setTimeout(() => {
                navigate("/"); // Redirect to home page after successful registration
            }, 1000);
        } else {
            alert("An unexpected response received");
        }
    } else if (response.data.statusCode === 400 && response.data.body === "\"The email already exists\"") {
        alert("Email already exists");
    } else {
        console.log("Unexpected response data:", response.data);
        alert("An unexpected response received");
    }
})
}
  

  return (
    <Grid
      templateRows="1fr"
      templateColumns="1fr"
      templateAreas='"main"'
      minHeight="100vh"
      width="100%"
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
        background=" white"
        // borderRadius="8px" // Optionally add border radius for a rounded appearance
        boxShadow="0 0 10px rgba(0, 1, 0.2, 0.2)"
        margin="auto"
        width="600px"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="mb-3">
              <h1>Registration Form</h1>
              <label htmlFor="userName" className="form-label" autoFocus />
              Username (Ex: Firstname Lastname)
              <input
                value={user.userName}
                onChange={(event) =>
                  setUser({ ...user, userName: event.target.value.trim() })
                }
                id="userName"
                type="text"
                className="form-control"
                // ref={nameRef}

                required
              />
              {errors.userName && (
                <div className="text-danger">{errors.userName}</div>
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label" />
              Email
              <input
                value={user.email}
                onChange={(event) =>
                  setUser({ ...user, email: event.target.value.trim() })
                }
                id="email"
                type="text"
                className="form-control"
                // ref={emailRef}
                required
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword6" className="col-form-label">
                Password
              </label>
              <input
                value={user.password}
                onChange={(event) => setUser({ ...user, password: event.target.value.trim() })}
                type="password"
                id="inputPassword6"
                className="form-control"
                required
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </Box>
    </Grid>
  );
}

export default Form;
