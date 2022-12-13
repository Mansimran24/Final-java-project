import {useState} from "react";
import { Card, Col, Typography, Button, Divider } from "antd";
import { Link } from "react-router-dom"; 
const {Paragraph} = Typography;
const PostCard = (props) => {
	 const [ellipsis, setEllipsis] = useState(true)
  return (
    <Col className="gutter-row" xs={24} sm={12} xl={6}>
      <div style={{marginBottom:"10px", marginTop:"10px", paddingLeft:"10px", paddingRight:"10px"}}>
        <Card hoverable title={props.title} >
          <Button type="primary" shape="round" ><Link to={`/single-post/${props.id}`} className="readmore">Read Blog
              </Link>
              </Button>
          
        </Card>
      </div>
    </Col>
  )
}

export default PostCard
