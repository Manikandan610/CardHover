import React, {useState} from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { Col, Row, Modal, Input } from "antd";
import { Card, Button } from "antd";
//import { SearchOutlined } from "@ant-design/icons";
import "../Dashboard/Sidebar.css";
import { updateCommaList } from "typescript";
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
  const deleteCard = (id) =>{
    // console.log("Hai",e);
    let items =JSON.parse(`${localStorage.getItem('employeeDetail')}`);
    
    // console.log(items.splice(id,id));
    items.splice(id,1);
    localStorage.setItem("employeeDetail", JSON.stringify(items));
    // console.log(items);  
    props.refresh();
          
  }
  
  //Card Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    //console.log(props.id);
    setIsModalVisible(true);
  };

    const [employeeName, setEmployeeName] = useState('');
    const [empdesignation, setEmployeeDesignation] = useState('');
    const [employeedetails, setEmployeeDetails] = useState('');

  const handleEdit = () => {
    //console.log(localStorage.key[0]);
    let data = JSON.parse(`${localStorage.getItem('employeeDetail')}`);
     data.map((value:any) =>{
      if(props.id === value.id){
        //console.log(employeeName);
        // return{
        //   ...value,
           let payload: any ={
            id: props.id,
            title:employeeName,
            description:empdesignation,
            card1paragraph:employeedetails
          }
        data.push(payload);
        localStorage.setItem('employeeDetail', JSON.stringify(data));
      }
      return value;
    })
    
    localStorage.setItem('employeeDetail', JSON.stringify(data));
    //this.props.updateList(datas);
    // console.log('props',props?.title)
    // //const selectedId = 1;
    // let data= JSON.parse(`${(localStorage.getItem('employeeDetail')) || '[]'}`);
    // const empd=Object.values(data);
    // const result:any =empd.find((data:any) => data.id == props.id && data.title == props.title);
    // console.log('result',result);
    // const id:any=result.id;
    // localStorage.removeItem(id);
    // // result.designation="SDE 4";
    // //    for(let i=0;i<employeeDetail.length;i++){
    // //   let emp1=JSON.parse(empdetails[i])
    // //   if (emp1.id == selectedId){
    // //     empdetails.splice(i,1)
    // //   }
    // // }    
    // let payload: any ={
    //   id:result.id,
    //   name:result.name,
    //   designation:result.designation,
    //   det: result.det
    // }
    // //const result:any =empdetails.find((item:any) => item.id === selectedId);
    // //console.log('result',result.name);
    // data.push(payload);
    // localStorage.setItem('employeeDetail', JSON.stringify(data));    
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
                            <Input type="hidden" value={props.id} />
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