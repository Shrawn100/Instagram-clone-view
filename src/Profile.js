import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
function Profile() {
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
        })
        .catch((error) => {
          console.error("Error fetching :", error);
        });
    } else {
    }
  }, []);

  return <div>Hello from profile</div>;
}

export default Profile;
