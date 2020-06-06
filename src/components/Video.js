import React from 'react';
import { parseYoutubeVideoUrl } from '../utils/youtube';
import { Button } from 'antd';
import { match, isEmpty } from 'ramda';

const Video = ({ video, onDeletedClick = () => {} }) => {
  const parseVideoUrl = videoUrl => {
    const ytRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
    return !isEmpty(match(ytRegex, videoUrl.src)) ? parseYoutubeVideoUrl(videoUrl.src) : videoUrl.src;
  };

  return (
    <div className={'video-responsive relative'}>
      <iframe src={parseVideoUrl(video)}>
      </iframe>
      <div className={'absolute bottom-0 right-0 p-1 text-right'}>
        <Button danger={true} onClick={() => onDeletedClick(video)}>Eliminar</Button>
      </div>
    </div>
  );
};

export default Video;
