import { Row, Button} from "antd";
import React, {useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./../components/Navbar";
import PostCard from "./../components/PostCard"
import { useNavigate } from "react-router-dom";

const BlogList = (props) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(false);
	 const navigate = useNavigate();

  const handleClick = () => {
    console.log("SOmething Happened");
    props.logout();
    navigate("/");
  };

  useEffect(() => {
    if(props.status){
        console.log("Authentication successfull")
    }
    else{
        navigate("/")
    }
  }, []);

   useEffect(() => {
    axios
      .get("http://localhost:9000/api/blogs")
      .then((response) => {
        setData(response.data);
        setStatus(true);
      })
      .catch(() => {
        console.log("API call Failed...!!!");
        setStatus(false);
      });
  }, []);
  return (
    <>
      {/* <Row gutter={16}>
        <Col xl={24}>
          <h1>Home page</h1>
        </Col>
      </Row> */}
      <Navbar />
      <Row>
        {data && data.map((item,i)=>{
          return(
          <PostCard key={item.id}
          id={item.id}
          title={item.title}
          blog={item.blog}
          authorname={item.authorname}
           />
          );
        })}
      </Row>
       <Button type="primary" onClick={handleClick}>Logout </Button>
    </>
  );
}
export default BlogList