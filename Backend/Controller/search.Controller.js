
import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../Model/User.model.js";

export const searchPerson = async (req, res) => {
    try {
        const { query } = req.params;

        // Await the API call and assign it to a variable named 'response'
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (!response || !response.results || response.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        });

        res.status(200).json({ success: true, content: response.results });

    } catch (error) {
        console.log("Error in search person controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const searchMovie = async (req, res) => {
    try {
        const { query } = req.params;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (!response || !response.results || response.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "movie",
                    createdAt: new Date()
                }
            }
        });
        res.status(200).json({ success: true, content: response.results })

    } catch (error) {
        console.log("Error in search movie controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const searchTV = async (req, res) => {
    try {
        const { query } = req.params;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if (!response || !response.results || response.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        });
        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("Error in search tv controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getSearchHistory = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            content: req.user.searchHistory
        })
    } catch (error) {
        console.log("Error in search history controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const removeItemFromSearchHistory = async (req, res) => {
    try {
        let { id } = req.params;
        id = parseInt(id);

        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id }
            }
        })

        return res.status(200).json({
            success: true,
            message: "Item removed successfully"
        })
    } catch (error) {
        console.log("Error in remove history item controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const saveSelectedToHistory = async (req, res) => {
    try {
        const { id, name, image, searchType } = req.body;

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id,
                    title: name,
                    image,
                    searchType,
                    createdAt: new Date()
                }
            }
        });

        res.status(200).json({ success: true, message: `${searchType} added to search history` });
    } catch (error) {
        console.log("Error in saveSelectedToHistory:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
