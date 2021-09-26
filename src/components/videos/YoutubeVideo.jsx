import React from "react";

const YoutubeVideo = ({ video }) => {
  return (
    <iframe src={`https://www.youtube.com/embed/${video.data.videoId}?autoplay=1`} title="YouTube video player"
    frameBorder="0" autoplay="1"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen></iframe>
  );
};

export default YoutubeVideo;
