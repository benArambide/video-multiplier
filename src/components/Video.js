import React from 'react';
import { Button } from 'antd';
import TwitchVideo from "./videos/TwitchVideo";
import YoutubeVideo from "./videos/YoutubeVideo";
import OtherVideo from "./videos/OtherVideo";

const Video = ({ video, onDeletedClick = () => {} }) => {
  return (
    <div className={'video-responsive relative'}>
      { video.type === 'twitch' && <TwitchVideo video={video} /> }
      { video.type === 'youtube' && <YoutubeVideo video={video} /> }
      { video.type === 'other' && <OtherVideo video={video} /> }
      <div className={'absolute bottom-0 right-0 p-1 text-right'}>
        <Button type="primary" danger={true} onClick={() => onDeletedClick(video)} size={'small'}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Video;
