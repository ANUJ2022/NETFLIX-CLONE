/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/Constants';
import { ChevronLeft, ChevronRight, Key } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const MovieSlider = ({ category }) => {
    const { contentType } = useSelector((state) => state.content);

    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);

    const sliderRef = useRef(null);
    const formattedCategoryName =
        category.replaceAll("_", " ").charAt(0).toUpperCase() +
        category.replaceAll("_", " ").slice(1);

    const formatedContentType = contentType === "movie" ? "Movies" : "TV Shows";


    useEffect(() => {
        const getContent = async () => {
            try {
                const res = await axiosInstance.get(`/${contentType}/${category}`);
                setContent(res.data.content);
            } catch (error) {
                console.error("Failed to fetch content:", error.message);
            }
        };

        getContent();
    }, [category, contentType]);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    };


    return (
        <div className='bg-black relative px-5 md:px-20 text-white' onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}>

            <h2 className='mb-4 text-2xl font-bold'>{formattedCategoryName} {formatedContentType}</h2>

            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
                {content.map((item) => (
                    <Link className='min-w-[250px] relative group' to={`/watch/${item.id}`} key={item.id}>
                        <div className='rounded-lg overflow-hidden'>
                            <img src={SMALL_IMG_BASE_URL + item.backdrop_path} alt="Movie image" className='transition-transform duration-300 ease-in-out group-hover:scale-125' />

                        </div>
                        <p className="mt-2 text-center">
                            {item.title || item.name}
                        </p>
                    </Link>
                ))}
            </div>

            {showArrows && (
                <>
                    <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                        onClick={scrollLeft}>
                        <ChevronLeft size={24} />
                    </button>
                    <button className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                        onClick={scrollRight}>
                        <ChevronRight size={24} />
                    </button>


                </>
            )}

        </div >
    )
}

export default MovieSlider
