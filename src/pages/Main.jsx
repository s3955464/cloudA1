// Main.jsx

import React, { useState, useEffect} from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
// Import SubscriptionArea and QueryArea
import SubscriptionArea from "./SubscriptionArea";
import QueryArea from "./QueryArea";
import { useLocation } from "react-router-dom"; 
import axios from "axios";


function Main(props) {
  const { user, onLogout } = props;
  const username = user?.username;
  const location = useLocation();
  const email = location.state?.email;
  const [subscribedMusic, setSubscribedMusic] = useState([]);
  
  
  const updateSubscribedMusic = (newSubscribedMusic) => {
    setSubscribedMusic(newSubscribedMusic);
  };

  const fetchSubscriptionDetails = () => {
    const userData = {
      email: email
    };
  
    axios
      .post(
        'https://n9fp60qzyc.execute-api.us-east-1.amazonaws.com/Production/displaysubscription',
        JSON.stringify(userData),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        console.log(response);
        const responseData = JSON.parse(response.data.body);
        if (response.status === 200 && responseData.length > 0) {
          setSubscribedMusic(responseData);
        } else {
          setSubscribedMusic([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching subscription details:', error);
      });
  };
  

    useEffect(() => { 
  fetchSubscriptionDetails();
}, [props.email, props.username, props.handleSubscribe]);

  
  // Define the handleLogout function
  const handleLogout = () => {
    onLogout();
    window.location.href = "/"; // Call the onLogout callback passed from the parent component
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" minHeight="100vh">
      {username && (
        <Flex alignItems="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold" mr={4}>
            User Area
          </Text>
          <Text>Welcome, {username}</Text>
          <Button ml={4} colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      )}
      <SubscriptionArea {...props} username={username} email={email}   subscribedMusic={subscribedMusic} setSubscribedMusic={setSubscribedMusic}/>
      <QueryArea {...props} email={email}  subscribedMusic={subscribedMusic} setSubscribedMusic={setSubscribedMusic} updateSubscribedMusic={updateSubscribedMusic} fetchSubscriptionDetails={fetchSubscriptionDetails}/>
    </Flex>
  );
}

export default Main;
