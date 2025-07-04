import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';

const Header = () => {

    const location = useLocation();
    const removeSpace = location?.search?.slice(3)?.split('%20')?.join(' ')

    const [searchInput, setSearchInput] = useState(removeSpace)

    const navigate = useNavigate()


    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`)

        }
    }, [searchInput])

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <header className="fixed top-0 w-full h-20 z-50 px-4 sm:px-6 md:px-12 lg:px-16   bg-[#1B1927]/80 backdrop-blur-md">


            <div className='container mx-auto flex items-center h-full'>
                <Link to='/' className="text-white">
                    <h1 className="text-4xl font-bold uppercase">Movibly</h1>
                </Link>

                <nav className='hidden lg:flex items-center gap-4 ml-5'>
                    <NavLink
                        to='/movie'
                        className="text-white hover:text-[#E6E2F4] transition-colors duration-300"
                    >
                        Movies
                    </NavLink>
                </nav>

                <div className="ml-auto flex items-center gap-3 sm:gap-5 w-full sm:w-auto">

                    <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl bg-[#605B7D] w-full sm:w-[350px] max-w-xl flex-1">
                        <FaSearch className="text-[#E6E2F4] text-xl sm:text-2xl" />
                        <div className="w-px h-6 bg-white opacity-50" />
                        <form className="flex-1" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="w-full bg-transparent text-[#E6E2F4] placeholder-[#E6E2F4] focus:outline-none"
                                onChange={(e) => {
                                    const value = e.target.value
                                    setSearchInput(value)

                                    if (value.trim() === '') {
                                        navigate('/')  
                                    } else {
                                        navigate(`/search?q=${value}`)
                                    }
                                }}
                                value={searchInput}
                            />
                        </form>
                    </div>

                 
                </div>
            </div>
        </header>
    )
}

export default Header;
