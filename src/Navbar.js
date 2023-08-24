import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-upper-half">
        <div className="heading-container">
          <h1 className="instagram-heading">Instagram</h1>
        </div>
        <div>Home</div>
        <div>Search</div>
        <div>Explore</div>
        <div>Reels</div>
        <div>Messages</div>
        <div>Notifications</div>
        <div>Create</div>
        <Link to="/profile">Profile</Link>
      </div>
      <div>More</div>
    </nav>
  );
}
export default Navbar;
