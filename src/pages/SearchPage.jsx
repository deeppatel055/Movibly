import  { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import axios from 'axios'

const SearchPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('q') || ''

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    if (!query || loading) return
    setLoading(true)
    try {
      const res = await axios.get('/search/multi', {
        params: {
          query,
          page
        }
      })
      setData(prev => [...prev, ...res.data.results])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query) {
      setPage(1)
      setData([])
    }
  }, [query])

  useEffect(() => {
    if (query) {
      fetchData()
    }
  }, [page, query])

  const handleScroll = useCallback(() => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !loading) {
      setPage(prev => prev + 1)
    }
  }, [loading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type="text"
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
      </div>

      <div className='container mx-auto'>
        <h2 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h2>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4 justify-items-center">

          {
            data.map((searchData, index) => (
              <Card
                data={searchData}
                key={`${searchData.media_type}-${searchData.id}-${index}`}
                media_type={searchData.media_type}
              />
            ))
          }
        </div>
        {loading && <p className="text-center mt-4">Loading more results...</p>}
      </div>
    </div>
  )
}

export default SearchPage
