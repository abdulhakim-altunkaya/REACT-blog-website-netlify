import Post from "./Post";

const Feed = ({posts}) => {
    return (
        <div>
            {posts.map( (result) => (
                <Post key={result.id} post={result}/>
            )

            )}
        </div>
    )
}

export default Feed
 