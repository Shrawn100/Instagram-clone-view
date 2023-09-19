import { Link } from "react-router-dom";
import { useRef } from "react";
import Create from "./Create";
function Navbar() {
  const dialogRef = useRef(null);

  function handleDialogClick() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }
  function handleCloseClick(e) {
    if (dialogRef.current) {
      const dialogDimensions = dialogRef.current.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialogRef.current.close();
      }
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-upper-half">
        <div className="heading-container">
          <h1 className="instagram-heading">Instagram</h1>
        </div>
        <Link to="/home">Home</Link>
        <div>Search</div>
        <div>Explore</div>
        <div>Reels</div>
        <div>Messages</div>
        <div>Notifications</div>
        <dialog onClick={handleCloseClick} ref={dialogRef}>
          <Create />
        </dialog>
        <button onClick={handleDialogClick}>Create</button>
        <Link to="/profile">Profile</Link>
      </div>
      <div>More</div>
    </nav>
  );
}
export default Navbar;
