import React from "react";
import Comments from "./components/Comments";

function App() {
  return (
    <div className="container mx-auto">
      <Comments currentUserId="1" />
    </div>
  );
}

export default App;
