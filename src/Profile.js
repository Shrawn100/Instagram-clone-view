import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
function Profile() {
  const [responseData, setResponseData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [displayName, setDisplayname] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("http://localhost:3000/profile", config)
        .then((response) => {
          console.log(response.data.userdata);
          setResponseData(response.data.userdata);
          setFollowers(response.data.userdata.followers);
          setFollowing(response.data.userdata.follwing);
          setDisplayname(response.data.userdata.name);
          setPosts(response.data.userdata.posts);
        })
        .catch((error) => {
          console.error("Error fetching :", error);
        });
    } else {
      //Unathorised
    }
  }, []);

  return (
    <div className="profile-page-wrapper-one">
      <Navbar></Navbar>
      {responseData ? (
        <div className="profile-page-wrapper-two">
          <div className="profile-page-wrapper-three">
            <div>upper section</div>
            <div>stories section</div>
            <div>posts section </div>
          </div>
        </div>
      ) : (
        <div>Fetching data</div>
      )}
    </div>
  );
}

export default Profile;
