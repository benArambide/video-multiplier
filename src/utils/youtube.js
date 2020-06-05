const matchYoutubeUrl = (url) => {
  const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? RegExp.$1 : false ;
};

export const parseYoutubeVideoUrl = youtubeVideoCode => {
  const ytId = matchYoutubeUrl(youtubeVideoCode);
  return `https://www.youtube.com/embed/${ytId}`;
};
