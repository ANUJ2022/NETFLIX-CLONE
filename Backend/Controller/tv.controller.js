
import { fetchFromTMDB } from "../services/tmdb.service.js"


export const getTrendingTVShow = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

        const randomTVShow = data.results[Math.floor(Math.random() * data.results?.length)];
        return res.status(200).json({
            success: true,
            content: randomTVShow
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getTVShowsTrailer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid or missing tv ID" });
        }
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

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

export const getTVShowDetails = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid or missing TV ID" });
    }

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`
        );

        return res.status(200).json({
            success: true,
            details: data
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getTVShowsByCategory = async (req, res) => {
    const { category } = req.params;
    if (!category) {
        return res.status(400).json({ success: false, message: "Invalid or missing tv category" });
    }
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

        return res.status(200).json({
            success: true,
            content: data.results
        })

    } catch (error) {
        console.error("Error fetching similar TV:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getSimilarTVShows = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid or missing movie ID" });
    }

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

        return res.status(200).json({
            success: true,
            similar: data.results
        })

    } catch (error) {
        console.error("Error fetching similar tv:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}