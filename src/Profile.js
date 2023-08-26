import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
function Profile() {
  const [responseData, setResponseData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [followerCount, setFollowerCount] = useState();
  const [followingCount, setFollowingCount] = useState();
  const [following, setFollowing] = useState([]);
  const [displayName, setDisplayname] = useState("");
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState();

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
          setFollowerCount(response.data.userdata.followers.length);
          setFollowing(response.data.userdata.follwing);
          setFollowingCount(response.data.userdata.following.length);
          setDisplayname(response.data.userdata.name);
          setPosts(response.data.userdata.posts);
          setPostsCount(response.data.userdata.posts.length);
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
            <div className="profile-picture">Profile pic</div>
            <div className="profile-page-wrapper-four">
              <div>{displayName}</div>
              <div className="profile-stats">
                <div> {postsCount} posts</div>
                <div>{followerCount} followers</div>
                <div>{followingCount} following</div>
              </div>
              <div>posts section </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Fetching data</div>
      )}
    </div>
  );
}

export default Profile;
