import React, {useState} from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { Col, Row } from "antd";
import { Card, Button } from "antd";
import "../Dashboard/Sidebar.css";
import ViewDetails from "./ViewDetails.tsx";


const { Content } = Layout;

type cardDetailsProps = {
    id: any
    title: string
    cardImage: string
    description: string
    card1paragraph: string
    card2paragraph: string
    refresh:any
}

// Content Main Function
export default (props:cardDetailsProps) => {
  
  const [isActive,cardHover] = useState(true);
  const cardMouseEnter = () => {
    cardHover(current=>!current);
  }
 
  //delete card
  const deleteCard = () =>{
    //console.log("Hai",id);
    let employeeDetail =JSON.parse(`${localStorage.getItem('employeeDetail')}`);
    for(let index = 0; index<employeeDetail.length; index++){
      if(props.id === employeeDetail[index].id){
        employeeDetail = [
          ...employeeDetail.slice(0, index),
          ...employeeDetail.slice(index+1)
        ];
      }
    }
    localStorage.setItem("employeeDetail", JSON.stringify(employeeDetail));
    // console.log(items);  
    props.refresh();        
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
          <div className="btndiv">
          
            <Button className="deletebtn" onClick={deleteCard}>Delete</Button>
            <ViewDetails 
              refresh={props.refresh}
              id={props.id}
              title={props.title}
              cardImage={props.cardImage}
              description={props.description}
              card1paragraph={props.card1paragraph}
              card2paragraph={props.card2paragraph}
              />
          </div>
      </div>
        </Card>
      
    </Col>

  </Row>
</Content>
  );
}
// export default Content1;