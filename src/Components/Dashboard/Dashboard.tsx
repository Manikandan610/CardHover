import React, {useState} from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { Col, Row } from "antd";
import "./Sidebar.css";
import Content from '../Content/Content.tsx';
import cardDetails from '../Content/CardData.tsx';
import HeaderPart from "./Header.tsx";
import Sidenav from "./Sidenav.tsx";

function Dashboard() {

  return (
    <div>
      <Layout>
        <Sidenav />
        <Layout>
              <HeaderPart />

              <div className="contentGrid">
                {cardDetails.map((card: any) => {
                  //console.log(card.title);
                  return(
                        <Row>
                          <Col span={6}>
                              <Content 
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