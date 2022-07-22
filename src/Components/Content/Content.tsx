import React, {useState} from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { Col, Row, Modal, Input } from "antd";
import { Card, Button } from "antd";
//import { SearchOutlined } from "@ant-design/icons";
import "../Dashboard/Sidebar.css";
//import C1 from "../../assets/images/C1.png";


const { Content } = Layout;
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

const Content1 = (props:cardDetailsProps) => {
  
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
    // console.log(items.splice(id,id));
    //items.splice(id,1);
    localStorage.setItem("employeeDetail", JSON.stringify(employeeDetail));
    // console.log(items);  
    props.refresh();        
  }
  
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
          
            <Button className="deletebtn" onClick={()=>deleteCard(props.id)}>Delete</Button>
            <Button type="primary" className="card2btn" onClick={showModal}>View Details</Button>

              <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} className="modalfield">
                      <Row>
                        <Col span={4}>
                          <img src={props.cardImage} className="cardImg" />
                        </Col>
                        <Col span={20}>
                          <h3 className="cardTitile">{props.title}</h3>
                          <p className="cardPara">{props.description}</p>
                          <p className="cardSpan">{props.card1paragraph}</p>
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
          </div>
      </div>
        </Card>
      
    </Col>

  </Row>
</Content>
  );
}
export default Content1;