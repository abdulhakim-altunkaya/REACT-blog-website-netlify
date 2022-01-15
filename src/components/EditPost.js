import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate} from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts.js"

const EditPost = () => {
    const {posts, setPosts} = useContext(DataContext);
    const [editTitle, setEditTitle] = useState("")
    const [editBody, setEditBody] = useState("")

    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id)
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody ])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), "dd MMMM yyy pp")
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(post => post.id === id ? {...response.data } : post));
        setEditTitle("");
        setEditBody("");
        navigate("/");
        } catch (err) {
        console.log(`Error is: ${err.message}`)
        }
    }

    return (
        <main className="NewPost">
            { editTitle && 
                <>
                    <h2>EDIT POST</h2>
                    <form className="newPostForm" onSubmit={(e)=> e.preventDefault()}>
                        <label htmlFor="editTitle">Title:</label>
                        <input 
                            type="text"
                            id="editTitle"
                            required
                            value={editTitle}
                            onChange={(e)=>{setEditTitle(e.target.value)}} />
                        <label htmlFor="editBody">Body:</label>
                        <textarea 
                            id="editBody"
                            required
                            value={editBody}
                            onChange={(e)=>{setEditBody(e.target.value)}} />
                        <button type="submit" onClick={() => handleEdit(post.id)}>SUBMIT</button>
                    </form>
                </>
            }
            {!editTitle && 
                <>
                    <p>You cannot edit a non-existing post</p>
                    <p><Link to="/">Visit Homepage</Link></p>
                </>
            }
            

        </main>
    )
}

export default EditPost
