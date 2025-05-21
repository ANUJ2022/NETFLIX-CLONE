import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';
import { fetchTrendingContentThunk } from '../../features/content/contentThunk';
import { useSelector, useDispatch } from 'react-redux';
import { MOVIE_CATEGORIES, TV_CATEGORIES, ORIGINAL_IMG_BASE_URL } from '../../utils/Constants';
import MovieSlider from '../../components/MovieSlider';

const HomeScreen = () => {

    const dispatch = useDispatch();

    const { contentType, data, loading } = useSelector((state) => state.content);
    const [imgLoading, setImgLoading] = useState(true)



    useEffect(() => {
        dispatch(fetchTrendingContentThunk(contentType))
    }, [dispatch, contentType])



    //TODO:  Add a loading spinner
    if (loading) return (
        <div className='h-screen text-white relative'>
            <Navbar />
            <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer'>
            </div>

        </div>
    )


    return (
        <>
            <div className='relative h-screen text-white'>
                <Navbar />
                {imgLoading && (<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer'>
                </div>)}
                <img
                    src={ORIGINAL_IMG_BASE_URL + data?.backdrop_path
                    }
                    alt="Hero image"
                    className='absolute top-0 w-full h-full object-cover -z-50'
                    onLoad={() => {
                        setImgLoading(false)
                    }}
                />

                <div className='
                absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true' />

                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
                    <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />

                    <div className='max-w-2xl'>
                        <h1 className='mt-4 text-6xl font-extrabold text-balance'>
                            {data?.title || data?.name}
                        </h1>
                        <p className='mt-2 text-lg'>
                            {data?.release_date?.split("-")[0] || data?.first_air_date?.split("-")[0]}{" "} | {data?.adult ? "18+" : "PG-13"}
                        </p>
                        <p className='mt-4 text-lg'>
                            {data.overview?.length > 200 ? data?.overview.slice(0, 200) + "..." : data?.overview}
                        </p>
                    </div>

                    <div className="flex mt-8">
                        <Link to={`/watch/${data?.id}`} className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'>
                            <Play className='size-6  mr-2 fill-black' />
                            Play
                        </Link>
                        <Link to={`/watch/${data?.id}`} className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'>
                            <Info className='size-6  mr-2 ' />
                            More Info
                        </Link>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-10 bg-black py-10'>
                {
                    contentType === "movie" ?
                        (MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />))
                        :
                        (TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
                        )
                }
            </div>
        </>
    )
}

export default HomeScreen
