import React, { useState } from 'react'
import { Col, Row, Modal, Input, Button } from "antd";

const { TextArea } = Input;

type cardDetailsProps = {
    id: any
    title: string
    cardImage: string
    description: string
    card1paragraph: string
    card2paragraph: string
    refresh:any
}
export default function ViewDetails(props:cardDetailsProps) {

 
  //Card Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    //console.log(props.id);
    setIsModalVisible(true);
  };

    const [employeeName, setEmployeeName] = useState(props.title);
    const [empdesignation, setEmployeeDesignation] = useState(props.description);
    const [employeedetails, setEmployeeDetails] = useState(props.card1paragraph);
    //console.log(employeeName);
    
  const handleEdit = () => {
    //console.log(localStorage.key[0]);
    let employeeDetail = JSON.parse(`${localStorage.getItem('employeeDetail')}`);
    let data= employeeDetail && employeeDetail.map((value:any) =>{
      if(props.title === value.title && props.description === value.description && props.card1paragraph === value.card1paragraph){
        // console.log("Props:",props.id);
        // console.log("Value:",value.id);
        return{
            ...value,
            title:employeeName,
            description:empdesignation,
            card1paragraph:employeedetails
          }
      }
      return value;
    })
    
    localStorage.setItem('employeeDetail', JSON.stringify(data));
    props.refresh();
    setIsModalVisible(false); 
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //TextArea Content
    const [value, setValue] = useState('');


  return (
    <>
        <Button type="primary" className="card2btn" onClick={showModal}>View Details</Button>

<Modal visible={isModalVisible} onCancel={handleCancel} footer={null} className="modalfield">
        <Row>
          <Col span={4}>
            <img src={props.cardImage} className="cardImg" />
          </Col>
          <Col span={20}>
            <h3 className="cardTitile">GRN approval</h3>
            <p className="cardPara">WF_PO_PROCESSING_STD2</p>
            <p className="cardSpan">Leave application for admin approval</p>
          </Col>
        </Row>
        <Row className="rowfield">
            <Col span={9} className="col2para">
                <p>Employee Name</p>
                <p>Designation</p>
                <p>Employee Details</p>
            </Col>
            <Col span={15} className="col3field">
             
                <Input placeholder="Enter Title" value={employeeName} onChange={(value:any)=>setEmployeeName(value.target.value)} className="inputText" />
                <Input placeholder="Enter Designation" value={empdesignation} onChange={(value:any)=>setEmployeeDesignation(value.target.value)} className="inputText" />
                <TextArea
                    // value={value}
                    value={employeedetails}
                    //onChange={e => setValue(e.target.value)}
                    placeholder="Employee Details"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    className="inputTextarea"
                    onChange={(value:any)=>setEmployeeDetails(value.target.value)}
                />
            </Col>
        </Row>
        <Row className="popupfooter">
        <Button type="primary" className="popupbtn" onClick={handleEdit}>Edit</Button>
        <Button className="popupdelbtn" onClick={handleCancel}>Cancel</Button>

        </Row>
</Modal>
    </>
  )
}
