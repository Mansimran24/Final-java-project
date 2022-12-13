import React,{useState, useEffect} from "react";
import { Col,Card, Typography,Button } from "antd";
import Navbar from "./../components/Navbar"
import axios from "axios";
import {useParams ,useNavigate } from 'react-router-dom';
const { Title, Paragraph, Text} = Typography;

const SinglePost = (props) => {
  const navigate = useNavigate();

const [ellipsis, setEllipsis] = useState(true)
const [data, setData] = useState(null);
const { id } = useParams();
const [status, setStatus] = useState(false);

  useEffect(() => {
     axios
      .get(`http://localhost:9000/api/blogs/${id}`)
      .then((response) => {
        setData(response.data[0]);
        setStatus(true);
      })
      .catch(() => {
        console.log("API call Failed...!!!");
        setStatus(false);
      });
  }, [id]);

  const deletePost = (id)=>{ 
    if(window.confirm(`Are you sure you want to delete`)){
      axios
      .delete(`http://localhost:9000/api/blogs/${id}`)
      .then((response)=>{
        console.log("Deleted successfuly");
        console.log(id);
         navigate("/home");
      })
      .catch(()=>{
        console.log("API failed to delete");
      });
    }
  }
  return (
    <>
    <Navbar />
    <Col className="gutter-row">
      <div
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Card title="Card title"value='{data && data.title}'>
          <Title>{data && data.title}</Title>
          <Paragraph
            ellipsis={
              ellipsis ? { row: 15, expandable: true, symbol: "more" } : false
            }
          >
           {data && data.blog}
          </Paragraph>
          <Text strong>Author:{data && data.authorname}</Text>
               
         
          <Col>
         
          <Button
            type="primary" danger
            shape="round"
            onClick={() =>deletePost(id) }
          >
            Delete
          </Button>
          </Col>
        </Card>
      </div>
    </Col>
    </>
  );
};

export default SinglePost;
