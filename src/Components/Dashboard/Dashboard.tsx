import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { Col, Row } from "antd";
import "./Sidebar.css";
import Content from '../Content/Content.tsx';
//import cardDetails from '../Content/CardData.tsx';
import HeaderPart from "./Header.tsx";
import Sidenav from "./Sidenav.tsx";

function Dashboard() {

  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let employeeDetail= JSON.parse(`${localStorage.getItem('employeeDetail') || '[]'}`);
    setCardData(employeeDetail);
    setLoading(false);
  },[loading])

  const refresh = ()=>{
    setLoading(true);
  }
  return (
    <div>
      <Layout>
        <Sidenav />
        <Layout>
              <HeaderPart refresh={refresh} />

              <div className="contentGrid">
                {cardData.map((card: any) => {
                  //console.log(card.title);
                  return(
                        <Row>
                          <Col span={6}>
                              <Content 
                                 refresh={refresh}
                                  id={card.id}
                                  title={card.title}
                                  cardImage={card.cardImage}
                                  description={card.description}
                                  card1paragraph={card.card1paragraph}
                                  card2paragraph={card.card2paragraph}
                              />
                          </Col>
                        </Row>
                        )
                   })}
              </div>
        </Layout>
      </Layout>
    </div>
  );
}
export default Dashboard;
