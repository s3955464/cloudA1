import React, { useState } from "react";
import { Box, Button, Flex, Grid, Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import SubscriptionArea from "./SubscriptionArea";



function QueryArea(props) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [artist, setArtist] = useState("");
  const [queriedMusic, setQueriedMusic] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [queryMade, setQueryMade] = useState(false); // Track if a query has been made
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const handleQuery = () => {
    // Construct the query parameters object
    const queryParams = {
      title: title,
      year: year,
      artist: artist
    };

    // Make a POST request to the backend API
    axios.post("https://n9fp60qzyc.execute-api.us-east-1.amazonaws.com/Production/queryarea", queryParams)
      .then((response) => {
        // Handle the response from the API
        console.log(response.data);
        const responseData = response.data;

        if (responseData.statusCode === 200) {
          // Successful response
          setQueriedMusic(JSON.parse(responseData.body));
          setErrorMessage("");
        } else if (responseData.statusCode === 400) {
          // Bad request response
          setQueriedMusic([]);
          setErrorMessage(responseData.body);
        } else {
          // Other errors
          setQueriedMusic([]);
          setErrorMessage("Internal Server Error");
        }
        setQueryMade(true); // Set queryMade to true after successful query
      })
      .catch((error) => {
        // Handle network errors
        console.error("Error querying music:", error);
        setQueriedMusic([]);
        setErrorMessage("Network Error");
        setQueryMade(true);
      });
  };

  const handleSubscribe = (title, email,artist, year) => {
    setSubscriptionMessage("");
    axios
      .post(
        "https://n9fp60qzyc.execute-api.us-east-1.amazonaws.com/Production/addsubscription",
        { title: title, email: email, artist: artist, year: year }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.statusCode === 200) {
          setSubscriptionMessage("Music subscribed successfully");
          // props.fetchSubscriptionDetails().then(data => {
          //   props.setSubscribedMusic(data)});
          const newSubscribedMusic = response.data.subscribedMusic;
          props.setSubscribedMusic(newSubscribedMusic); // Update in QueryArea
          props.updateSubscribedMusic(newSubscribedMusic);

          // Fetch subscription details again to refresh the data
          props.fetchSubscriptionDetails();
        }
        else {
          setSubscriptionMessage("You have already subscribed to this music");
        }
      })
      .catch((error) => {
        console.error("Error removing subscribed music:", error);
      });

  }

  return (
    <Box className="query-area" p="4" border="1px solid #ccc" borderRadius="md" mt="4">
      <Text fontSize="xl" fontWeight="bold" mb="4">Query Area</Text>
      <Flex direction="column" mt="4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb="2"
        />
        <Input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          mb="2"
        />
        <Input
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          mb="2"
        />
        <Button colorScheme="blue" onClick={handleQuery}>Query</Button>
      </Flex>
      {/* Display queried music */}
      <Box mt="4">
        {queryMade && (
          <>
            {errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              queriedMusic.length > 0 ? (
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {queriedMusic.map((music, index) => (
                    <Box key={index}>
                      {/* <Image src={music.image_url} alt={music.title} /> */}
                      <p>Title: {music.title}</p>
                      <p>Artist: {music.artist}</p>
                      <p>Year: {music.year}</p>
                      {/* Check if the image_url property exists before trying to render the image */}
                      {music.image_url && <Image src={music.image_url} alt={music.title} />}
                      <Button  colorScheme="teal" onClick={() => handleSubscribe(music.title, props.email ,music.artist, music.year)}>Subscribe</Button>
                    </Box>
                  ))}
                </Grid>
              ) : (
                <p>No result is retrieved. Please query again</p>
              )
            )}
          </>
        )}
      </Box>
        {/* Display subscription message */}
        {subscriptionMessage && <p>{subscriptionMessage}</p>}
    </Box>
  );
}

// return {handleSubscribe};

export default QueryArea;

