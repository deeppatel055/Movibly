import { IoClose } from 'react-icons/io5';
import useFetchDetails from '../hooks/useFetchDetails';

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetails(`/${media_type}/${data?.id}/videos`);
  const videoKey = videoData?.results?.[0]?.key;

  return (
    <section className="fixed inset-0 z-40 bg-neutral-700/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative">

        <button
          onClick={close} className="absolute -right-1 -top-6 text-3xl z-50 text-white hover:text-gray-300 transition"
        >
          <IoClose />
        </button>

        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            className="w-full h-full rounded"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex justify-center items-center w-full h-full text-white text-lg">
            Trailer not available
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoPlay;
