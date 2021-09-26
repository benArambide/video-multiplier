import {always, cond, equals, includes, length, match, prop, T} from "ramda";
import { v4 as uuidv4 } from 'uuid';

export const isTwitchVideo = url => includes('https://www.twitch.tv', url);
export const isYoutubeVideo = url => includes('https://www.youtube.com/', url);

const getUrlSegments = url => match(/(?<!\?.+)(?<=\/)[\w-]+(?=[/\r\n?]|$)/g, url);

const getTwitchData = url => () => {
  const segments = getUrlSegments(url);
  const user = length(segments) === 1 ? prop(0, segments): null;
  const videoId = prop(0, segments) === 'videos' ? prop(1, segments): null;
  return {
    user,
    videoId,
  };
};

const getYoutubeData = url => () => {
  const videoId = match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/, url);
  return {
    videoId: prop(1, videoId),
  }
};

export const parseVideo = video => {
  const videoUrl = video.src;
  const videType = cond([
    [isTwitchVideo, always('twitch')],
    [isYoutubeVideo, always('youtube')],
    [T, always('other')],
  ])(video.src);

  const videData = cond([
    [equals('twitch'), getTwitchData(videoUrl)],
    [equals('youtube'), getYoutubeData(videoUrl)],
    [T, always(null)],
  ])(videType);

  console.log('videData', videData);
  return {
    id: uuidv4(),
    type: videType,
    src: videoUrl,
    data: videData,
  };
};
