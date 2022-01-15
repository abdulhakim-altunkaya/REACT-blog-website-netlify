import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const { data, fetchError, isLoading} = useAxiosFetch("http://localhost:3500/posts");

    useEffect(() => {
        setPosts(data);
    }, [data]);

    useEffect(() => {
        const filteredResults = posts.filter( (result)=>((result.body).toLowerCase()).includes(search.toLowerCase()) 
        || ((result.title).toLowerCase()).includes(search.toLowerCase()))
        const filteredResults2 = filteredResults.reverse();
        setSearchResults(filteredResults2);
    }, [posts, search])

    return(
        <DataContext.Provider value={{
            data, fetchError, isLoading,
            posts, setPosts, search, setSearch, searchResults, setSearchResults,
        }}>
            {children}
        </DataContext.Provider>
    )
}
export {
    DataContext,
    DataProvider
}

