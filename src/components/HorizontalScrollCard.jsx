import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from './Card';

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 my-5">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 text-white capitalize">{heading}</h2>

      <div className="relative w-full h-full">
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex absolute left-0 top-1/2 transform -translate-y-1/2 h-12 w-12 z-20 items-center justify-center text-amber-50 text-3xl md:text-4xl hover:bg-gradient-to-l hover:from-transparent hover:to-[#1c1b23] transition-all"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] gap-4 md:gap-6 lg:gap-8 grid-flow-col scroll-smooth transition-all scrollbar-none overflow-x-auto py-10 pl-2"
        >
          {data.map((item, index) => (
            <Card
              key={item.id}
              data={item}
              index={index + 1}
              trending={trending}
              media_type={media_type}
            />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex absolute right-0 top-1/2 transform -translate-y-1/2 h-12 w-12 z-20 items-center justify-center text-amber-50 text-3xl md:text-4xl hover:bg-gradient-to-r hover:from-transparent hover:to-[#1c1b23] transition-all"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
