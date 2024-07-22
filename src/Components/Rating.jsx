import { Avatar, Divider, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

function Rating() {
  const mockData = useSelector((state) => state.items);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 10; // Number of items per page

  const [enlargedId, setEnlargedId] = useState(null);

  const handleAvatarClick = (id) => {
    setEnlargedId(enlargedId === id ? null : id);
  };

  const loadMoreData = () => {
    if (loading || !hasMore) {
      console.log("Loading or no more data");
      return;
    }
    setLoading(true);

    // Sort mockData by score in descending order
    const sortedData = [...mockData].sort((a, b) => b.score - a.score);

    // Simulate loading data from sortedData
    setTimeout(() => {
      const newData = sortedData.slice(currentIndex, currentIndex + pageSize);
      console.log("New Data:", newData);
      setData([...data, ...newData]);
      setCurrentIndex(currentIndex + pageSize);
      setLoading(false);

      // Determine if there are more items to load
      if (currentIndex + pageSize >= sortedData.length) {
        setHasMore(false);
      }
    }, 500); // Simulate network delay
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "100vh", // Ensure it has a height to enable scrolling
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              onClick={() => handleAvatarClick(item.id)} // Toggle enlarged state on click
              style={{ cursor: "pointer" }} // Change cursor to pointer
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://mighty.tools/mockmind-api/content/human/${item.id}.jpg`}
                    size={enlargedId === item.id ? 256 : 128}
                  >
                    {item.fullName[0]}
                  </Avatar>
                }
                title={
                  <a
                    href={`https://mighty.tools/mockmind-api/content/human/${item.id}.jpg`}
                  >
                    {item.fullName}
                  </a>
                }
                description={`Score: ${item.score}`}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default Rating;
