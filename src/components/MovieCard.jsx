import React, { useState } from "react";
import MovieDetailsCard from "./MoviesDetailsCard";
const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    overview,
  },
  onMovieClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="movie-card relative cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onMovieClick(id)} // Gọi hàm khi click vào
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "./no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>

      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-80 text-white flex items-center justify-center p-4 text-center">
          <p className="text-sm">{overview || "No overview available"}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
