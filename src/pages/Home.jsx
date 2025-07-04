import React from 'react'
import BannerHome from './../components/BannerHome';
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';


const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData)

  const { data: nowPlayingData } = useFetch('/movie/now_playing')
  const { data: UpcomingData } = useFetch('/movie/upcoming')
  const { data: topRatedData } = useFetch('/movie/top_rated')


  return (
    <>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={'Trending'} trending={true} />
      <HorizontalScrollCard data={UpcomingData} heading={'Upcoming Movies'} media_type={'movie'} />
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={'movie'} />
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} media_type={'movie'} />

    </>
  )
}

export default Home