import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import axios from "axios";

function SubscriptionArea(props) {
  const [subscribedMusic, setSubscribedMusic] = useState([]);
  const userData = {
    // username: props.username,
    email: props.email
  };
  useEffect(() => {
    // Fetch subscription details from the backend API
    const fetchSubscriptionDetails = async () => {
      try {
        // Make a GET request to the API endpoint
        // const response = await axios.post("https://n9fp60qzyc.execute-api.us-east-1.amazonaws.com/Production/displaysubscription", {
        //   params: {
        //     email: props.email,
        //     username: props.username,
        //   },
        // });

          axios
          .post('https://n9fp60qzyc.execute-api.us-east-1.amazonaws.com/Production/displaysubscription', JSON.stringify(userData), // Wrap user data in 'body' key
            {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then((response) => {
              console.log(response);
              
              // Parse the response body
                const responseData = JSON.parse(response.data.body);
                  
                  if (response.status === 200 && responseData.length > 0) {
                      // Set the state with the received data
                      setSubscribedMusic(responseData);
                  } else {
                      // If no subscribed music is available, set the state to an empty array
                      setSubscribedMusic([]); 
                  }
              



          })
            .catch((error) => {
              console.error("Error fetching subscription details:", error);
            });
        }
       catch (error) {
        console.error("Error fetching subscription details:", error);
      }
    };

    // Call the fetchSubscriptionDetails function
    fetchSubscriptionDetails();
  }, [props.email, props.username, props.subscribedMusic]); // Re-run effect when email or username changes

  // Function to handle removal of subscribed music
  const handleRemove = ( title) => {
    axios
      .post(
        "https://n9fp60qzyc.execute-api.us-east-1.amazonaws.com/Production/removesubscription",
        { email: props.email, title: title }
      )
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted music from the frontend
          setSubscribedMusic((prevMusic) =>
          prevMusic.filter((music) => music.title !== title)
          );
        }
      })
      .catch((error) => {
        console.error("Error removing subscribed music:", error);
      });
  };

  return (
    <Box className="subscription-area" p="4" borderRadius="md" mt="4">
      <Text fontSize="xl" fontWeight="bold" mb="4">Subscription Area</Text>
      <Grid templateColumns="repeat(6, minmax(200px, 1fr))" gap={6}>
        {subscribedMusic.length > 0 ? (
          subscribedMusic.map((music) => (
            <Box key={music.title} boxShadow="md" rounded="md" overflow="hidden">
              <Image src={music.image_url} alt={music.title} />
              <Box p="4">
                <Text fontWeight="bold">{music.title}</Text>
                <Text>Artist: {music.artist}</Text>
                <Text>Year: {music.year}</Text>
                <Button mt="2" colorScheme="orange" onClick={() => handleRemove(music.title)}>Remove</Button>
              </Box>
            </Box>
          ))
        ) : (
          <Text>No subscribed music available</Text>
        )}
      </Grid>
    </Box>
    // <div className="subscription-area">
    //   <h3>Subscription Area</h3>
    //   <Grid templateColumns="repeat(4, 1fr)" gap={4}>
    //   {Array.isArray(subscribedMusic) 
    //   ? ( subscribedMusic.map((music) => (
    //       <Box >
    //         <Image src={music.image_url} alt={music.title} />
    //         <p>Title: {music.title}</p>
           
    //         <p> Artist: {music.artist}</p>
    //         <p>Year: {music.year}</p>
    //         <Button colorScheme="orange" onClick={() => handleRemove(music.title)}>Remove</Button>
    //       </Box>
    //     ))
    //     ): (
    //       <Box>
    //         <p>No subscribed music available</p>
    //       </Box>
      
    //   )}

    //   </Grid>
    // </div>
  );
}

export default SubscriptionArea;
