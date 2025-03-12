import React from "react";

const MovieDetailsCard = ({ movie, onClose }) => {
  if (!movie) return null;

  const {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    overview,
    budget,
    revenue,
    runtime,
  } = movie;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-2xl relative shadow-xl flex gap-6">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "./no-movie.png"
          }
          alt={title}
          className="w-80 h-[450px] object-cover rounded-lg"
        />

        {/* Movie Details */}
        <div className="flex-1">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-white transition"
          >
            &times;
          </button>

          {/* Movie Info */}
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-gray-300 text-sm mt-2">
            {overview || "No overview available."}
          </p>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-400 text-sm">
            <p>
              <span className="font-medium text-white">Rating:</span>{" "}
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </p>
            <p>
              <span className="font-medium text-white">Release Year:</span>{" "}
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
            <p>
              <span className="font-medium text-white">Language:</span>{" "}
              {original_language?.toUpperCase() || "N/A"}
            </p>
            <p>
              <span className="font-medium text-white">Runtime:</span>{" "}
              {runtime
                ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
                : "N/A"}
            </p>
            <p>
              <span className="font-medium text-white">Budget:</span>{" "}
              {budget ? `$${budget.toLocaleString()}` : "N/A"}
            </p>
            <p>
              <span className="font-medium text-white">Revenue:</span>{" "}
              {revenue ? `$${revenue.toLocaleString()}` : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
