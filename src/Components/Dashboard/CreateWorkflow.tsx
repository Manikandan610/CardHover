import React, { useState } from 'react'
import { Row, Col, Input, Button, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';


const { TextArea } = Input;

    //Upload Image Code1
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
  
const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG/SVG file!');
        }
    const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
    return isJpgOrPng && isLt2M;
  };

  //CreateWorkflow main function
export default ({refresh}) => {

    //Model Code
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [empdesignation, setEmployeeDesignation] = useState('');
    const [employeedetails, setEmployeeDetails] = useState('');
   
    const [imageUrl, setImageUrl] = useState<string>();
    
    const showModal = () => {
      setIsModalVisible(true);
    };

    //Create Workflow Card
    const handleOk = () => {
        let employeeDetail= JSON.parse(`${localStorage.getItem('employeeDetail') || '[]'}`);

        //Generate Id from Data and Time
        const date =new Date()
        const generateId =date.getTime();

        let payload: any ={
            id: generateId,
            title:employeeName,
            cardImage: imageUrl,
            description:empdesignation,
            card1paragraph:employeedetails,
            card2paragraph: "This workflow is to enable an employee raise his leave request and get it approved it from him reporting manager"
        }
        employeeDetail.push(payload);
        localStorage.setItem('employeeDetail', JSON.stringify(employeeDetail));
        
        setEmployeeName('');
        setEmployeeDesignation('');
        setEmployeeDetails('');
        setImageUrl('');
        setIsModalVisible(false); 
        refresh();
    };
   

    const handleCancel = () => {
      setEmployeeName('');
      setEmployeeDesignation('');
      setEmployeeDetails('');
      setIsModalVisible(false);
    };

    //Upload Image Code2
    const [loading, setLoading] = useState(false);
    //const [imageUrl, setImageUrl] = useState<string>();
  
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
            setLoading(false);
            setImageUrl(url);
        });
      }
    };
  
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    //TextArea Content
    //const [value, setValue] = useState('');


  return (
    <Col span={6} className="midright">
            <Button type="primary" className="headright" onClick={showModal}>Create Workflow</Button>

                <Modal title="Setup Employee" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                    <Row>
                        <Col span={6}>
                            <Upload
                                name="avatar"
                                //value={employeeImage}
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Col>
                        <Col span={6} className="col2para">
                            <p>Employee Name</p>
                            <p>Designation</p>
                            <p>Employee Details</p>
                        </Col>
                        <Col span={12} className="col3field">
                            <Input 
                                placeholder="Enter Title" className="inputText" 
                                value={employeeName} onChange={(value:any)=>setEmployeeName(value.target.value)} />
                            <Input 
                                placeholder="Enter Designation" className="inputText" 
                                value={empdesignation} onChange={(value:any)=>setEmployeeDesignation(value.target.value)} />
                            <TextArea
                                value={employeedetails}
                                //  onChange={e => setValue(e.target.value)}
                                placeholder="Employee Details"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                className="inputTextarea"
                                onChange={(value:any)=>setEmployeeDetails(value.target.value)} 
                            />
                        </Col>
                    </Row>
                    <Row className="popupfooter">
                    <Button type="primary" className="popupbtn" onClick={handleOk}>Save</Button>
                    <Button className="popupdelbtn" onClick={handleCancel}>Cancel</Button>
            
                    </Row>
                </Modal>
        </Col>
  )
}
