import React from "react";
import actorImage from "/assets/images/actor.png";
import actressImage from "/assets/images/actress.png";

const CastInfo = ({ cast }) => {
  const firstTenCast = cast.slice(0, 10);
  return (
    <div className="cast-info mx-5 z-20 m-[20px_0px_90px_0px]  md:col-[1_/_3] md:mx-auto md:px-8 md:py-4 md:w-full min-[950px]:pl-20 min-[1090px]:pl-32 xl:col-[2_/_3] xl:pl-14 2xl:pl-0">
      <h3 className="font-bold mb-2 text-xl">Cast</h3>
      <div className="scroller cast-list overflow-x-scroll flex flex-nowrap">
        <div className="cast-scroll flex md:mr-auto md:my-0 pb-2">
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
                />
              ) : actor.gender === 1 ? (
                <img
                  className="w-32 rounded mb-[5px]"
                  src={actressImage}
                  alt={actor.name}
                />
              ) : (
                <img
                  className="w-32 rounded mb-[5px]"
                  src={actorImage}
                  alt={actor.name}
                />
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
