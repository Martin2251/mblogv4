import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

// REST API
const apiUrl = "http://localhost:3004/posts";

function App() {
  const [postList, setPostList] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");

  // in the scope of the component
  async function fetchPostList() {
    const response = await fetch(apiUrl); // GET
    const data = await response.json();
    setPostList(data); // update our state
  }

  async function createArticle(articleData) {
    // create a post/article
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(articleData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // refetch and refresh the UI
    fetchPostList();
  }

  useEffect(() => {
    fetchPostList(); // will be called when user land on the page
  }, []); // it will execute only on component did mount

  return (
    <div className="App">
      {postList.map((post) => {
        return (
          <div>
            <p>{post.title}</p>
          </div>
        );
      })}
      <input
        value={newPostTitle}
        onChange={(event) => setNewPostTitle(event.target.value)}
      ></input>
      <button
        onClick={() => {
          createArticle({ title: newPostTitle, author: "user" });
          setNewPostTitle(""); // clears the input
        }}
      >
        Create a fake post
      </button>
    </div>
  );
}

export default App;
