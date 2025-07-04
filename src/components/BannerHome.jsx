import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { IoPlayCircleOutline } from "react-icons/io5";
import VideoPlay from './VideoPlay'; // adjust path if needed
import { motion } from 'framer-motion';

const BannerHome = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [movieName, setMovieName] = useState('');
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieRating, setMovieRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [desc, setDesc] = useState('');
  const [language, setLanguage] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const bannerData = useSelector(state => state.movieData.bannerData);
  const imageURL = useSelector(state => state.movieData.imageURL);
  const genres = useSelector(state => state.movieData.genres);

  const media_type = selectedMovie?.media_type || "movie";

  useEffect(() => {
    if (bannerData.length > 0 && imageURL && genres.length > 0) {
      const fetchImage = async () => {
        try {
          const movies = bannerData.filter(movie => movie.backdrop_path != null);
          if (movies.length > 0) {
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            const poster = imageURL + randomMovie.backdrop_path;

            // Preload image
            const img = new Image();
            img.src = poster;
            img.onload = () => {
              setBackgroundImage(poster);
              setIsImageLoaded(true);
              setMovieName(randomMovie.title || randomMovie.name);
              const genreNames = randomMovie.genre_ids
                ?.map(id => genres.find(g => g.id === id)?.name)
                .filter(Boolean);
              setMovieGenres(genreNames);
              setMovieRating(randomMovie.vote_average.toFixed(1));
              setReleaseDate(randomMovie.release_date);
              setDesc(randomMovie.overview);
              setLanguage(randomMovie.original_language);
              setSelectedMovie(randomMovie); // set for VideoPlay
            };
          }
        } catch (error) {
          console.log( error);
        }
      };

      fetchImage();
    }
  }, [bannerData, imageURL, genres]);

  return (
    <section className="w-full h-full m-0 p-0">
      <div className="flex min-h-full max-h-[100vh] overflow-hidden">
        <div className="min-w-full min-h-[450px] lg:min-h-screen relative group transition-all">

          {/* Background Image */}
          <div className="w-full h-full">
            {isImageLoaded ? (
              <img
                src={backgroundImage}
                alt="banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-black/70 flex items-center justify-center text-white text-lg">
                Loading background...
              </div>
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute top-0 w-full h-full bg-gradient-to-t from-[#1B1927] to-transparent"></div>

          {/* Movie Details */}
          <div className="container mx-auto sm:px-6 lg:px-8">
            {isImageLoaded && movieName && desc && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute bottom-0 w-full max-w-5xl text-white px-4 pb-8 mb-6"
              >
                {/* <button
                  onClick={() => setShowVideo(true)}
                  className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg font-medium hover:opacity-80 transition"
                >
                  <IoPlayCircleOutline className="text-xl sm:text-2xl md:text-3xl" />
                  Play Video
                </button> */}
                <button
                  onClick={() => setShowVideo(true)}
                  className="flex items-center justify-center lg:justify-start gap-3 text-white text-lg font-medium hover:opacity-80 transition-all duration-300 mb-6 group"
                >
                  <IoPlayCircleOutline className="text-6xl group-hover: transition-transform duration-300" />
                  <span className="text-xl">Play Trailer</span>
                </button>
                <h2 className="mb-3 font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-tight drop-shadow-lg">
                  {movieName}
                </h2>

                {movieGenres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {movieGenres.map((genre, index) => (
                      <span
                        key={index}
                        className="text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-300 px-3 py-1 rounded-full bg-gray-700"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs md:text-sm lg:text-base my-3 text-gray-300">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" /> {movieRating}
                  </span>
                  {releaseDate && (
                    <>
                      <LuDot />
                      <span>{releaseDate}</span>
                    </>
                  )}
                  {language && (
                    <>
                      <LuDot />
                      <span className="uppercase">{language}</span>
                    </>
                  )}
                </div>

                <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-gray-200 text-justify max-w-4xl">
                  {desc}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Video Play Modal */}
      {showVideo && selectedMovie && (
        <VideoPlay
          data={selectedMovie}
          media_type={media_type}
          close={() => setShowVideo(false)}
        />
      )}
    </section>
  );
};

export default BannerHome;
