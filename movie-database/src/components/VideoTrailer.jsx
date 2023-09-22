import React from 'react'
// import {ReactComponent as VideoIcon} from "../../public/assets/video.svg";

const VideoTrailer = ({videos}) => {
   const videoPath = videos.find((video) => (video.type.toLowerCase() === "trailer" && video.official && video.site.toLowerCase() === "youtube")).key;

  return (
    <div>
        {/* <VideoIcon /> */}
        <a className='text-bright-orange' href={`https://www.youtube.com/watch?v=${videoPath}`} target='_blank' rel='noopener'>Watch Official Trailer</a>
    </div>
  )
}

export default VideoTrailer