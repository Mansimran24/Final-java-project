import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import BlogList from "./pages/BlogList";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import './App.css';
import SinglePost from "./pages/SinglePost";

function App() {
    const [status, setStatus] = useState(false);

  const authenticate = ()=>{
    setStatus(true)
  }

  const logout = ()=>{
    setStatus(false)
  }
  return (
     <div>
      <Routes>
        <Route path="/" element={<Login auth={authenticate}/>} />
        <Route path="/home" element={<BlogList logout={logout} status={status}/>} />
        <Route path="/create" element={<Dashboard logout={logout} status={status}/>} />
        <Route path="/single-post/:id" element={<SinglePost logout={logout} status={status}/>} />
      </Routes>
    </div>
  );
}

export default App;
