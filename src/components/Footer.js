const Footer = () => {
    const today = new Date();

    return (
        <div className="Footer">
            <p>Copyright &#169; {today.getFullYear()} </p>
        </div>
    )
}

export default Footer
