import React from 'react'
import { Layout, Menu } from "antd";
import L1 from "../../assets/images/L1.svg";
import L2 from "../../assets/images/L2.svg";
import L3 from "../../assets/images/L3.png";
import L4 from "../../assets/images/L4.svg";
import L5 from "../../assets/images/L5.svg";
import L6 from "../../assets/images/L6.svg";
import L7 from "../../assets/images/L7.svg";
import L8 from "../../assets/images/L8.png";
import L9 from "../../assets/images/L9.svg";

const { Sider } = Layout;

function Sidenav() {
  return (
    <Sider className="SideBar">
          <div className="Logo">
            <img src={L1} />
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]} className="midicon">
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
  )
}

export default Sidenav