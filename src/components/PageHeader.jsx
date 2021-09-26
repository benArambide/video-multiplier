import React from "react";

const PageHeader = () => {
  return (
    <div className="w-full mx-auto py-1 px-4 bg-white">
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
  );
};

export default PageHeader;
