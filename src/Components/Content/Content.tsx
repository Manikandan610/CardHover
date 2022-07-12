import React, {useState} from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { Col, Row } from "antd";
import { Card, Button } from "antd";
//import { SearchOutlined } from "@ant-design/icons";
import "../Dashboard/Sidebar.css";
//import C1 from "../../assets/images/C1.png";


const { Content } = Layout;


type cardDetailsProps = {
    title: string
    cardImage: string
    description: string
    card1paragraph: string
    card2paragraph: string
}


const Content1 = (props:cardDetailsProps) => {
  
  const [isActive,cardHover] = useState(true);
  const cardMouseEnter = () => {
    cardHover(current=>!current);
  }

    return (
        
<Content style={{ margin: "30px 10px" }}>
  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    <Col className="gutter-row" span={6}>
      
      
        <Card style={{ width: 290, height: 130 }} className="card1">
          <div className={isActive ? 'site-card-border-less-wrapper' : 'card2'} onMouseEnter={cardMouseEnter}>
            <Row>
              <Col span={6}>
                <img src={props.cardImage} className="cardImg" />
              </Col>
              <Col span={18}>
                <h3 className="cardTitile">{props.title}</h3>
                <p className="cardPara">{props.description}</p>
                <p className="cardSpan">{props.card1paragraph}</p>
              </Col>
            </Row>
          </div>
        
      
      <div className={isActive ? 'card2' : 'site-card-border-less-wrapper'} onMouseLeave={cardMouseEnter}>
          <span className="card2Para">{props.card2paragraph}</span>
          <Button type="primary" className="card2btn">View Details</Button>
      </div>
    </Card>
      
    </Col>

  </Row>
</Content>
  );
}
export default Content1;