
import { Outlet } from 'react-router-dom'
import './App.css'
import { useDispatch } from 'react-redux'
import { setBannerData, setImageURL, setGenres } from './store/movieSlice';
import { useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const dispatch = useDispatch()

  const fetchTrendingData = async () => {
    try {

      const res = await axios.get('trending/all/week');
      const moviesOnly = res.data.results.filter(item => item.media_type === 'movie');

      dispatch(setBannerData(moviesOnly));
    } catch (error) {
      console.log('error', error);
    }
  }

  const fetchConfiguration = async () => {
    try {
      const res = await axios.get('/configuration')
      dispatch(setImageURL(res.data.images.secure_base_url + 'original'))



    } catch (error) {
      console.log('error', error);

    }
  }
  const fetchGenres = async () => {
    try {
      const res = await axios.get('/genre/movie/list')
      dispatch(setGenres(res.data.genres))


    } catch (error) {

      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchTrendingData()
    fetchConfiguration()
    fetchGenres()
  }, [])

  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-[90vh]'>

        <Outlet />
      </div>
      <Footer />
    </main>


  )
}

export default App
