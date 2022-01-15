import {useParams, Link} from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate} from "react-router-dom";
import api from "../api/posts.js"

const PostPage = () => {
    const {posts, setPosts} = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id)
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        await api.delete(`/posts/${id}`);
        const postList = posts.filter((result)=> result.id !== id)
        setPosts(postList)
        navigate("/")
    }

    return (
        <main className="PostPage">
            <article className="post">
                {post && 
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton">EDIT</button></Link>
                        <button onClick={()=> handleDelete(post.id)} className="deleteButton">Delete Post</button>
                    </>

                }
                {!post && 
                    <>
                        <h2>Post Deleted</h2>
                        <p><Link to="/">Create a new post</Link></p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage
