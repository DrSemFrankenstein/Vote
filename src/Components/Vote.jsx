// Home.js
import { Col, Image, Row } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PhotoRatingSystem from "../Helper/PhotoRatingSystem";
import { updateScore } from "../app/actions"; // Import the action
import { Typography } from "antd";

function Vote() {
  const { Title } = Typography;
  const [ratingSystem] = useState(new PhotoRatingSystem());
  const [randomRecords, setRandomRecords] = useState([]);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    if (isMounted) {
      setRandomRecords(getRandomRecords(items, 2));
    }

    return () => {
      isMounted = false; // Cleanup function sets the flag to false
    };
  }, [items]);

  useEffect(() => {
    // Optional: Initialize data if needed (can be handled by store initialization)
  }, [dispatch]);

  // Function to shuffle and get random records
  function getRandomRecords(data, count) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Handle photo selection
  const handlePhotoClick = (winnerId) => {
    const loserId = randomRecords.find((item) => item.id !== winnerId).id;
    const { winner, loser } = ratingSystem.updateRatings(winnerId, loserId);
    console.log("Updated Ratings:", ratingSystem.getRatings());

    // Get new random records
    setRandomRecords(getRandomRecords(items, 2));

    // Update score in Redux
    dispatch(updateScore(winnerId, winner));
    dispatch(updateScore(loserId, loser));
  };

  return (
    <>
      <Title level={2} style={{ textAlign: "center", color: "white" }}>
        {/* Who's Hotter? Click to Choose. */}
        Choose your favorite. Click to Choose.
      </Title>
      <Row gutter={[32, 32]} justify="center">
        {randomRecords.map((item) => (
          <Col key={item.id} className="gutter-row" xs={24} lg={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                preview={false}
                src={item.img || `https://mighty.tools/mockmind-api/content/human/${item.id}.jpg`}
                style={{ marginBottom: 16, cursor: "pointer" }}
                onClick={() => handlePhotoClick(item.id)}
              />
              <h3>{item.fullName}</h3>
              {/* <p>Score: {item.score}</p> */}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Vote;
