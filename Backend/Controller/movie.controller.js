import { fetchFromTMDB } from "../services/tmdb.service.js"


export const getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");

        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        
        return res.status(200).json({
            success: true,
            content: randomMovie
        })
    } catch (error) {
        console.error("TMDB Fetch Error:", error); // Add this
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getMovieTrailer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid or missing movie ID" });
        }
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        
        return res.status(200).json({
            success: true,
            trailer: data.results
        })
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null)
        }
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }


}

export const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid or missing movie ID" });
    }

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`
        );
        
        return res.status(200).json({
            success: true,
            details: data
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getMoviesByCategory = async (req, res) => {
    const { category } = req.params;
    if (!category) {
        return res.status(400).json({ success: false, message: "Invalid or missing movie category" });
    }
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        
        return res.status(200).json({
            success: true,
            content: data.results
        })

    } catch (error) {
        console.error("Error fetching similar movies:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getSimilarMovies = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid or missing movie ID" });
    }

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        
        return res.status(200).json({
            success: true,
            similar: data.results
        })


    } catch (error) {
        console.error("Error fetching similar movies:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}