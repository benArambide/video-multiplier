import React from "react";

const OtherVideo = ({ video }) => {
  return (
    <iframe src={video.src}>
    </iframe>
  );
};

export default OtherVideo;
