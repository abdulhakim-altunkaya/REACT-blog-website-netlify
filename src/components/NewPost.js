import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate} from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts.js"

const NewPost = () => {
    const {posts, setPosts} = useContext(DataContext);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit works")
        const newId = posts.length ? posts.length + 1 : 1; 
        const newDate = format(new Date(), "dd MMMM yyy pp")
        const newPost = {id: newId, title: postTitle, datetime: newDate, body: postBody}
        console.log(newPost);
        try {
        const response = await api.post("/posts", newPost)
        const newPosts = [...posts, response.data]
        setPosts(newPosts);
        setPostTitle("");
        setPostBody("");
        navigate("/");
        } catch (err) {
        console.log(`Error is: ${err.message}`)
        }
    }

    return (
        <main className="NewPost">
            <h2>NEW POST</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input 
                    type="text"
                    id="postTitle"
                    required
                    value={postTitle}
                    onChange={(e)=>{setPostTitle(e.target.value)}} />
                <label htmlFor="postBody">Body:</label>
                <textarea 
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e)=>{setPostBody(e.target.value)}} />
                <button type="submit">SUBMIT</button>
            </form>

        </main>
    )
}

export default NewPost
