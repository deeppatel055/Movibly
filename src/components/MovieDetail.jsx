
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchDetails from './../hooks/useFetchDetails';
import useFetch from './../hooks/useFetch';
import { FaStar } from 'react-icons/fa';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { useState } from 'react';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import VideoPlay from '../components/VideoPlay';

const MovieDetails = () => {
  const params = useParams();
  const imageURL = useSelector(state => state.movieData.imageURL);
  const { data: castData } = useFetchDetails(`${params?.explore}/${params?.id}/credits`);
  const { data } = useFetchDetails(`${params?.explore}/${params?.id}`);
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`);
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);

  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showAllCast, setShowAllCast] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const hour = Math.floor(data?.runtime / 60);
  const minute = data?.runtime % 60;

  const director = castData?.crew?.find(person => person.job === 'Director');
  const writers = castData?.crew?.filter(person =>
    ['Writer', 'Screenplay', 'Story', 'Novel', 'Characters'].includes(person.job)
  );

  return (
    <div className='w-full min-h-screen bg-[#1B1927]'>
      <section className='relative w-full h-screen overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${imageURL + data?.backdrop_path})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1927] via-[#1B1927]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1927] via-[#1B1927]/60 to-transparent" />

        <div className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 max-w-7xl mx-auto w-full">
            <div className="flex-shrink-0 flex justify-center lg:justify-start">
              <img
                src={imageURL + data?.poster_path}
                alt={data?.title}
                className='h-64 w-44 sm:h-80 sm:w-56 md:h-96 md:w-64 lg:h-[500px] lg:w-80 object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300'
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
                {data?.title}
              </h1>

              {data?.tagline && (
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 italic">
                  {data?.tagline}
                </p>
              )}

              <div className="mb-6 flex gap-3 flex-wrap justify-center lg:justify-start">
                {director && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-gray-400 text-sm font-medium">Directed by:</span>
                    <span className="text-white text-sm">{director.name}</span>
                  </div>
                )}
                {writers && writers.length > 0 && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-gray-400 text-sm font-medium">Written by:</span>
                    <span className="text-white text-sm">
                      {writers.slice(0, 3).map(writer => writer.name).join(', ')}
                      {writers.length > 3 && ` and ${writers.length - 3} more`}
                    </span>
                  </div>
                )}
              </div>

              {data?.genres && data?.genres.length > 0 && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  {data?.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="text-xs sm:text-sm lg:text-base text-gray-300 px-3 py-1 rounded-full bg-gray-700"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <FaStar className="text-yellow-400 text-xl" />
                <span className="text-white text-xl font-semibold">
                  {data?.vote_average?.toFixed(1)}
                </span>
                <span className="text-gray-400 text-sm">
                  ({data?.vote_count} votes)
                </span>
              </div>

              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center justify-center lg:justify-start gap-3 text-white text-lg font-medium hover:opacity-80 transition-all duration-300 mb-6 group"
              >
                <IoPlayCircleOutline className="text-6xl group-hover: transition-transform duration-300" />
                <span className="text-xl">Play Trailer</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-sm md:text-base">
                <div>
                  <span className="text-white font-semibold">Status: </span>
                  <span className="text-gray-300">{data?.status}</span>
                </div>
                <div>
                  <span className="text-white font-semibold">Release Date: </span>
                  <span className="text-gray-300">{data?.release_date}</span>
                </div>
                <div>
                  <span className="text-white font-semibold">Runtime: </span>
                  <span className="text-gray-300">{hour}h {minute}m</span>
                </div>
              </div>

              <div className="max-w-4xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Overview</h3>
                <p className="text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed">
                  {showFullOverview
                    ? data?.overview
                    : `${data?.overview?.substring(0, 200)}${data?.overview?.length > 200 ? '...' : ''}`}
                </p>
                {data?.overview?.length > 200 && (
                  <button
                    onClick={() => setShowFullOverview(!showFullOverview)}
                    className="text-blue-400 hover:text-blue-300 mt-2 text-sm font-medium"
                  >
                    {showFullOverview ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {castData?.cast && castData.cast.length > 0 && (
        <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {castData.cast.slice(0, showAllCast ? castData.cast.length : 12).map((actor, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="aspect-w-3 aspect-h-4 relative">
                    <img
                      src={
                        actor.profile_path
                          ? `${imageURL}${actor.profile_path}`
                          : '/api/placeholder/150/200'
                      }
                      alt={actor.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                      {actor.name}
                    </h4>
                    <p className="text-gray-400 text-xs line-clamp-2">
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {castData.cast.length > 12 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllCast(!showAllCast)}
                  className="px-6 py-3 text-white rounded-lg bg-[#605B7D] transition-all duration-300 hover:scale-105"
                >
                  {showAllCast ? 'Show Less' : 'View All Cast'}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <HorizontalScrollCard data={similarData} heading={'Similar Movies'} trending={true} />
      <HorizontalScrollCard data={recommendationData} heading={'Recommendations Movies'} trending={true} />

      {showVideo && data && (
        <VideoPlay
          data={data}
          media_type={params?.explore}
          close={() => setShowVideo(false)}
        />
      )}
    </div>
  );
};

export default MovieDetails;
