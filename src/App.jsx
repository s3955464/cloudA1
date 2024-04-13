import "./App.css";
import { Grid, GridItem, Image, Box } from "@chakra-ui/react";
// import NavBar from "./components/NavBar";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Main from "./pages/Main";




import SubcriptionArea from "./pages/SubscriptionArea";

import QueryArea from "./pages/QueryArea";


function App() {
  // const location = useLocation();
  // const shouldShowNavbar = !["/login", "/signup", "/register"].includes(location.pathname);
  
  const [user, setUser] = useState(null);
  
  const setUserDetails = (userData) => {
    setUser(userData);
  };
  

  const handleLogout = () => {
    setUser(null);
  };
  
  // useEffect(() => {
  //   // Redirect to login page after user state is set to null
  //   if (user === null && window.location.pathname !== "/Login") {
  //     window.location.href = "/Login";
  //   }
  // }, [user]);
  
  


  return (
    
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: `"nav nav " "main" "footer"`,
      }}
    >
      {/* {shouldShowNavbar && (
        <GridItem area="nav" bg="#B3A398">
          <NavBar />
        </GridItem>
      )} */}
      <GridItem area="main" display="flex" background="">
        <Box display="flex" p={3} margin="0" height="auto">
        

           <Routes>
          
            <Route
              path="/"
              element={
                <Login
                user={user}
                  setUserDetails={setUserDetails}
                  // updateCartItemOfLoginUser={updateCartItemOfLoginUser}
                />
              }
            />
            

            <Route
              path="/SignUp"
              element={
                <SignUp 
                // signedInUser={setUsername} 
                user={user} />
              }
            />
            <Route
              path="/Main"
              element={<Main  user={user} onLogout={handleLogout}/>}
            />
            <Route path="/SubcriptionArea" element={<SubcriptionArea />} />
            <Route
              path="/SubcriptionArea"
              element={
                <SubcriptionArea
                  // cartItems={cartItems}
                  // removeFromCart={removeFromCart}
                  // addToCart={addToCart}
                  // handleDecrement={handleDecrement}
                  // handleIncrement={handleIncrement}
                />
              }
            />
            <Route path="/QueryArea" element={<QueryArea />} />
            <Route
              path="/QueryArea"
              element={
                <QueryArea
                  // cartItems={cartItems.filter(
                  //   (item) => item.LoginUser === username
                  // )}
                />
              }
            />
            {/* <Route
                path="/logout"
                element={handleLogout}
              /> */}
             {/* <Route path="/smallscalefarming" element={<SmallScaleFarming />} />  */}
          </Routes> 
          
        </Box>
      </GridItem>
      <GridItem area="footer" bg="878F96">
        <Footer />
      </GridItem>
    </Grid>
    
  );
}

export default App;
