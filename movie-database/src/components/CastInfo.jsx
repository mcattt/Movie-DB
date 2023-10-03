import React from "react";
import actorImage from "/assets/images/actor.png";
import actressImage from "/assets/images/actress.png";


const CastInfo = ({ cast }) => {
  const firstTenCast = cast.slice(0, 10);
  return (
    <div className="cast-info m-[20px_0px_40px_0px] sm:m-[20px_0px_10px_0px]">
      <h3 className="font-bold mb-2">Cast</h3>
      <div className="cast-list overflow-x-scroll flex flex-nowrap">
        <div className="cast-scroll flex">
          {firstTenCast.map((actor) => (
            <div
              key={actor.id}
              className="cast-item flex-[0_0_auto] mr-[20px] text-center w-32"
            >
            {/* Cast image - check if the image path exists - if yes show the image, if not check the gender to show the proper general avatar */}
            {actor.profile_path ? (
              <img
                className="w-32 rounded mb-[5px]"
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
              /> ) : (
                actor.gender === 1 ? (
                 (<img
                  className="w-32 rounded mb-[5px]"
                  src={actressImage}
                  alt={actor.name}
                />)) : (
                  <img
                className="w-32 rounded mb-[5px]"
                src={actorImage}
                alt={actor.name}
              />
                )
              )}
              <p className="font-bold">{actor.name}</p>
              <p>{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastInfo;
