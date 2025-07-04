import { useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Card = ({ data,  media_type }) => {
  const imageURL = useSelector(state => state.movieData.imageURL);
  const genres = useSelector(state => state.movieData.genres);

  const mediaType = data.media_type ?? media_type;
  const genreNames = data.genre_ids
    ?.map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean);

  const releaseDate = data.release_date || data.first_air_date || 'N/A';
  const title = data.title || data.name || 'Untitled';
  const rating = typeof data.vote_average === 'number' ? data.vote_average.toFixed(1) : 'N/A';

  const language = data.original_language;

  return (
    <Link to={'/'+mediaType+'/'+data.id} className="w-full mb-10 sm:w-[180px] md:w-[200px] lg:w-[230px] aspect-[2/3] relative overflow-visible transition-all transform group hover:scale-105 duration-300">
      
      {data.poster_path ? (
        <img
          src={imageURL + data.poster_path}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center text-white text-xs sm:text-sm">
          No image found
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1927] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 sm:p-3 text-white flex flex-col justify-end">
        <h3 className="text-sm sm:text-base font-bold">{title}</h3>

        <div className="flex items-center text-xs sm:text-sm gap-1 mt-1 text-gray-300">
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-xs" /> {rating}
          </span>
          <LuDot />
          <span>{releaseDate}</span>
          {language && (
            <>
              <LuDot />
              <span className="uppercase">{language}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {genreNames?.map((genre, idx) => (
            <span
              key={idx}
              className="text-[9px] sm:text-[10px] px-2 py-0.5 bg-gray-700 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Card;
