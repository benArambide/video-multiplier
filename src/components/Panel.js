import React, { useState, useEffect } from 'react';
import {map, toString, isNil, reject, propEq} from 'ramda';
import Video from "./Video";
import MenuButton from "./MenuButton";
import MenuGridButton from "./MenuGridButton";
import {parseVideo} from "../utils/video";
import PageHeader from "./PageHeader";

const VIDEO_LIST_NAME = 'RO_VIDEO_LIST_NAME';
const saveLocal = data => sessionStorage.setItem(VIDEO_LIST_NAME, toString(data));
const getLocal = () => JSON.parse(sessionStorage.getItem(VIDEO_LIST_NAME));

const Panel = () => {
  const [videos, setVideoList] = useState([]);
  const [columns, setColumns] = useState(2);

  const onVideoAdded = videoAdded => {
    const newVideoList = [...videos, parseVideo(videoAdded)];
    setVideoList(newVideoList);
    saveLocal(newVideoList);
  };

  const onDeletedClick = deleteVideo => {
    const newVideoList = reject(propEq('src', deleteVideo.src), videos);
    setVideoList(newVideoList);
    saveLocal(newVideoList);
  };

  const onChangedGrid = newColumns => {
    setColumns(newColumns)
  };

  useEffect(() => {
    const prevList = getLocal();
    if(!isNil(prevList)) {
      setVideoList(prevList)
    }
  }, [setVideoList]);

  return (
    <div>
      <PageHeader />
      <div className={'flex flex-wrap --mx-1'}>
        {
          map( video => (
            <div className={`w-full md:w-1/${columns}`} key={video.src}>
              <Video video={video} onDeletedClick={onDeletedClick} />
            </div>
          ), videos)
        }
      </div>
      <div style={{bottom: 10, right: 10, position: 'fixed', zIndex: 2, width: 230}} className={'flex justify-between'}>
        <MenuGridButton onChangedGrid={onChangedGrid}/>
        <MenuButton onVideoAdded={onVideoAdded}/>
      </div>
    </div>
  );
};

export default Panel;
