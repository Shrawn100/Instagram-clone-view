import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [postsList, setPostsList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("http://localhost:3000/home", config)
        .then((response) => {
          console.log(response.data.sortedPostsList);
          setPostsList(response.data.sortedPostsList);
        })
        .catch((error) => {
          console.error("Error fetching :", error);
        });
    } else {
      //Unathorised
    }
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
}
export default Home;
