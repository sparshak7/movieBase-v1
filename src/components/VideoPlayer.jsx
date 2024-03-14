import React from "react";

const VideoPlayer = ({ id, size }) => {
  return (
    <iframe
      width="100%"
      height={size ? "150px" : "500px"}
      src={`https://www.youtube.com/embed/${id}`}
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
