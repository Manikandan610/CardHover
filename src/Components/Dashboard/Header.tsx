import React from 'react'
import { Layout, Row, Col } from "antd";
import SearchBar from './SearchBar.tsx';
import CreateWorkflow from './CreateWorkflow.tsx';
//import cardDetails from '../Content/CardData.tsx';

const { Header } = Layout;

// function HeaderPart({refresh}) {

// HeaderPart Main function 
  export default ({refresh}) => {

      return (
        <Header>
            <Row>
            <Col span={6}>
                <p className="lefthead">Workflow</p>
            </Col>
                <SearchBar />
                <CreateWorkflow refresh={refresh}/>
            </Row>
      </Header>
      )
}

//export default HeaderPart;