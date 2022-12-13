import { Link } from "react-router-dom";
import React from "react";


const Navbar = (props) => {

  return (
    <div className="mvls-container">
              <nav className="mvls-nav">
                <span className="mvls-title">TheBlog</span>                
                <Link to="/home">Homes</Link>
                <Link to="/create">Add Blog</Link>  
              </nav>
          </div>
  );
};

export default Navbar;
