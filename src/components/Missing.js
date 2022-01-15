import {Link} from "react-router-dom";

const Missing = () => {
    return (
        <main className="Missing">
            <h2>Page not found</h2>
            <br />
            <p><Link to="/" style={{textDecoration: "none"}}>Click here to visit homepage</Link></p>
        </main>
    )
}

export default Missing
