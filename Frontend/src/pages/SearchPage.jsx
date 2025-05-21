import { useState } from "react"
import { setContentType } from "../features/content/contentSlice";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/Constants";

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");

    const [result, setResult] = useState([]);

    const dispatch = useDispatch();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        tab === "movie" ? dispatch(setContentType('movie')) : dispatch(setContentType('tv'));
        setResult([]);
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.get(`/search/${activeTab}/${searchTerm}`)
            setResult(res.data.content)
        } catch (error) {
            if (error.response.status === 404) {
                toast("Nothing found, make sure ou are searching under the right category")
            } else {
                toast.error("An error accoured, please try again later")
            }

        }
    }

    

    return (
        <div className="bg-black min-h-screen text-white
        ">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center gap-3 mb-4">
                    <button className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => handleTabClick("movie")}>
                        Movies
                    </button>
                    <button className={`py-2 px-4 rounded ${activeTab === "tv shows" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => handleTabClick("tv")}>
                        TV Shows
                    </button>
                    <button className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => handleTabClick("person")}>
                        Person
                    </button>
                </div>
                <form className="flex gap-2 items-stretch mb-8 maxx-w-2xl mx-auto" onSubmit={handleSearch}>
                    <input type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={"Search for a " + activeTab}
                        className="w-full p-2 rounded bg-gray-800 text-white" />
                    <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                        <Search className="size-6" />
                    </button>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {result.map((r) => {
                        if (!r.poster_path && !r.profile_path) return null;
                        return (
                            <div key={r.id} className="bg-gray-800 p-4 rounded">
                                {activeTab === "person" ? (
                                    <div className="flex flex-col items-center">
                                        <img src={ORIGINAL_IMG_BASE_URL + r.profile_path} alt={r.name}
                                            className="maxx-h-96 rounded mx-auto" />
                                        <h2 className="mt-2 text-xl font-bold">{r.name}</h2>
                                    </div>
                                ) : (
                                    <Link to={"/watch/" + r.id} onClick={() => setContentType(activeTab)}>
                                        <img src={ORIGINAL_IMG_BASE_URL + r.poster_path} alt={r.title || r.name}
                                            className="w-full h-auto rounded" />
                                        <h2 className="mt-2 text-xl font-bold">{r.title || r.name}</h2>
                                    </Link>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default SearchPage
