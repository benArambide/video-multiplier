import React, {useEffect} from "react";

const TwitchVideo = ({ video }) => {
  const embedStream = () => {
    new window.Twitch.Embed(video.id, {
      channel: video.data.user,
      layout: 'video',
      video: video.data.videoId,
      parent: [window.location.hostname]
    });
  };
  useEffect(embedStream, []);
  return (
    <div id={video.id}></div>
  );
};

export default TwitchVideo;
