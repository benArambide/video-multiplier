import React, { useState, useEffect } from 'react';
import {map, toString, isNil, reject, propEq} from 'ramda';
import Video from "./Video";
import MenuButton from "./MenuButton";
import MenuGridButton from "./MenuGridButton";

const VIDEO_LIST_NAME = 'RO_VIDEO_LIST_NAME';
const saveLocal = data => sessionStorage.setItem(VIDEO_LIST_NAME, toString(data));
const getLocal = () => JSON.parse(sessionStorage.getItem(VIDEO_LIST_NAME));

const Panel = () => {
  const [videos, setVideoList] = useState([]);
  const [columns, setColumns] = useState(2);

  const onVideoAdded = videoAdded => {
    const newVideoList = [
      ...videos,
      videoAdded
    ];
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
      <div className="w-full mx-auto py-1 px-4">
        <div className="w-full flex items-center justify-between">
          <a
            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#">
            Video Multiplier
          </a>
          <div className="flex items-center text-right">
            <div>
              <p className="leading-none m-0">Add your video url and it will embed in a frame view. You need to verify if your video can be embedded.</p>
              <p className="leading-none m-0">In youtube video case, we gonna parse all the urls.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={'flex flex-wrap --mx-1 min-h-screen bg-gray-200'}>
        {
          map( video => (
            <div className={`w-full md:w-1/${columns}`}>
              <Video video={video} onDeletedClick={onDeletedClick}/>
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
