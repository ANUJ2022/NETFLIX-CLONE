/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../features/auth/authThunk';
import toast from 'react-hot-toast';
import { setContentType } from "../features/content/contentSlice"

const Navbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { contentType } = useSelector((state) => state.content);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logoutThunk()).unwrap(); // unwrap for success/failure
            toast.success("Logged out successfully");
        } catch (error) {
            console.log(error)
            toast.error("Logout failed");
        }
    };

    const handleTypeChange = (type) => {
        dispatch(setContentType(type));
        
    }

    const { user } = useSelector((state) => state.auth);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }



    return (
        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            <div className="flex items-center gap-10 z-50">
                <Link to={"/"}>
                    <img src="/netflix-logo.png" alt="Netflix Logo" className='w-32 sm:w-40' />
                </Link>

                {/* //desktop navbar items */}
                <div className='hidden sm:flex gap-2 items-center'>
                    <Link to={"/"} className='hover:underline' onClick={() => handleTypeChange("movie")}>
                        Movies</Link>
                    <Link to={"/"} className='hover:underline' onClick={() => handleTypeChange("tv")}>
                        TV Shows</Link>
                    <Link to={"/history"} className='hover:underline'>
                        Search History</Link>

                </div>
            </div>

            <div className="flex gap-2 items-center z-50">
                <Link to={"/search"}>
                    <Search className="size-6 cursor-pointer" />
                </Link>
                <img src={user.image} alt="Avatar" className='h-8 rounded cursor-pointer' />
                <LogOut className='size-6 cursor-pointer' onClick={handleLogout} />

                <div className="sm:hidden">
                    <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
                </div>
            </div>
            {/* mobile navbar items  */}
            {isMobileMenuOpen && (
                <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                    <Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
                        Movies
                    </Link>
                    <Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
                        TV Shows
                    </Link>
                    <Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
                        Search History
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Navbar
