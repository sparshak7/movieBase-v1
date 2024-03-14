import React from "react";
import PropTypes from "prop-types";

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

VideoPlayer.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.bool,
};

export default VideoPlayer;
