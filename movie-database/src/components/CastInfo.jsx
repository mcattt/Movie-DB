import React from "react";

const CastInfo = ({ cast }) => {
  const firstTenCast = cast.slice(0, 10);
  console.log(firstTenCast);
  return (
    <div className="cast-info m-[20px]">
      <h3>Cast</h3>
      <div className="cast-list overflow-x-scroll flex flex-nowrap">
        <div className="cast-scroll flex">
          {firstTenCast.map((actor) => (
            <div
              key={actor.id}
              className="cast-item flex-[0_0_auto] mr-[20px] text-center"
            >
              <img
                className="w-32 rounded mb-[5px]"
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
              />
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
