import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { Col, Row } from "antd";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./Sidebar.css";
import L1 from "../../assets/images/L1.svg";
import L2 from "../../assets/images/L2.svg";
import L3 from "../../assets/images/L3.png";
import L4 from "../../assets/images/L4.svg";
import L5 from "../../assets/images/L5.svg";
import L6 from "../../assets/images/L6.svg";
import L7 from "../../assets/images/L7.svg";
import L8 from "../../assets/images/L8.png";
import L9 from "../../assets/images/L9.svg";
import Content from '../Content/Content.tsx';
import cardDetails from '../Content/CardData.tsx';

//const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };
//const { Search } = Input;
const { Header, Sider } = Layout;

function Sidebar() {
  return (
    <div>
      <Layout>
        <Sider className="SideBar">
          <div className="Logo">
            <img src={L1} />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["4"]}
            className="midicon"
          >
                <Menu.Item>
                  <img src={L2} />
                </Menu.Item>
                <Menu.Item>
                  <img src={L3} />
                </Menu.Item>
                <Menu.Item>
                  <img src={L4} className="midicon3" />
                </Menu.Item>
                <Menu.Item>
                  <img src={L5} />
                </Menu.Item>
                <Menu.Item>
                  <img src={L6} />
                </Menu.Item>
          </Menu>
          <div className="boticon">
            <img src={L7} />
            <img src={L8} />
            <img src={L9} />
          </div>
        </Sider>
        <Layout>
          <Header>
            <Row>
              <Col span={6}>
                <p className="lefthead">Workflow</p>
              </Col>
              <Col span={12} className="midhead">
                <Input placeholder='Search a workflow' prefix={<SearchOutlined />}></Input>
              </Col>
              <Col span={6} className="midright">
                <Button type="primary" className="headright">Create Workflow</Button>
              </Col>
            </Row>
          </Header>
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
export default Sidebar;
