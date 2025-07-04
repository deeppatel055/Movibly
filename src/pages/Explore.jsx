import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from './../components/Card';
import { IoIosArrowDown } from "react-icons/io";


const Explore = () => {
  const params = useParams();
  const genres = useSelector((state) => state.movieData.genres);

  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleOptionClick = (genreId) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genreId)
        ? prevSelected.filter((id) => id !== genreId)
        : [...prevSelected, genreId]
    );
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setPageNo(1);
    setData([]);
  }, [params.explore, selectedGenres]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const genreParam = selectedGenres.join(',');
        const res = await axios.get(`/discover/${params.explore}`, {
          params: {
            page: pageNo,
            ...(genreParam && { with_genres: genreParam }),
          },
        });
        setData((prev) => [...prev, ...res.data.results]);
        setTotalPageNo(res.data.total_pages);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNo, selectedGenres, params.explore]);


  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        setPageNo((prev) => (prev < totalPageNo ? prev + 1 : prev));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalPageNo]);

  const removeGenre = (id) => {
    setSelectedGenres((prev) => prev.filter((gid) => gid !== id));
  };


  const CardSkeleton = () => (
    <div className="w-full h-[360px] rounded-xl
   bg-gradient-to-t from-[#3f3b53] to-transparent
    animate-pulse" />
  );


  return (
    <div className="py-16 mt-10 mx-4 sm:mx-8 lg:mx-16 xl:mx-20">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-wrap mb-4">
          <h3 className="capitalize text-lg lg:text-3xl font-semibold my-2 text-amber-50">
            Explore {params.explore}
          </h3>


          <div ref={dropdownRef} className="relative w-full md:w-auto">
            <div
              onClick={toggleDropdown}
              className="border rounded-4xl px-4 py-2 sm:px-6 sm:py-2 cursor-pointer min-w-[200px] sm:min-w-[300px] bg-[#CEC7E9] text-[#1B1927] flex items-center justify-between text-base sm:text-xl"
            >
              Select Genres
              <div className="flex gap-2 sm:gap-3 items-center justify-center ml-2">
                <div className="w-px h-4 sm:h-6 bg-white opacity-50" />
                <IoIosArrowDown className="text-lg sm:text-2xl" />
              </div>
            </div>

            {open && (
              <div className="absolute rounded-xl top-full left-0 mt-1 border  bg-[#CEC7E9] z-50 max-h-[200px] overflow-y-auto w-full min-w-[200px] scrollbar-none">
                {genres.map((genre) => (
                  <div
                    key={genre.id}
                    onClick={() => handleOptionClick(genre.id)}
                    className={`px-4 py-2 cursor-pointer flex justify-between items-center ${selectedGenres.includes(genre.id) ? 'bg-[#E6E2F4]' : ''
                      }`}
                  >
                    <span>{genre.name}</span>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedGenres.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedGenres.map((id) => {

              const genre = genres.find((g) => g.id === id);
              return (
                <> hello
                  <span
                    key={id}
                    className="bg-[#CEC7E9]  text-[#1B1927] px-4 py-1.5 rounded-full text-sm flex items-center"
                  >
                    {genre?.name}
                    <button
                      onClick={() => removeGenre(id)}
                      className="ml-2 text-xs cursor-pointer"
                    >
                      ✖
                    </button>
                  </span>
                </>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4 justify-items-center">
          {loading && data.length === 0
            ? Array.from({ length: 10 }).map((_, i) => (
              <CardSkeleton key={`skeleton-${i}`} />
            ))
            : data.map((exploreData, index) => (
              <Card
                data={exploreData}
                key={`${exploreData.id}-${index}-exploreSection`}
                media_type={params.explore}
              />
            ))}
        </div>

      </div>
    </div>
  );
};

export default Explore;
