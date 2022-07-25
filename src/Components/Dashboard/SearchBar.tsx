import React, { useState } from 'react'
import { Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Content from '../Content/Content.tsx';
//import Dashboard from './Dashboard.tsx';

export default () => {

   //Search Cards
    const [search, setNewSearch] = useState("");

    const handleSearchChange = (e) => {
        setNewSearch(e.target.value);
    };

    let employeeDetail= JSON.parse(`${localStorage.getItem('employeeDetail') || '[]'}`);
    const filtered = !search
                    ? employeeDetail
                    : employeeDetail.filter((card) =>
                        card.title.toLowerCase().includes(search.toLowerCase())
                        );

  return (
    <Col span={12} className="midhead">
            <Input placeholder='Search a workflow' value={search} onChange={handleSearchChange} prefix={<SearchOutlined />}></Input>
            {filtered.map((card:any) => {
                return (
                //    <Content />
                  console.log(card.title)
                );
              })}
        </Col>
  )
}
