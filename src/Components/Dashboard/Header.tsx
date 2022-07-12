import React, { useState } from 'react'
import { Layout, Row, Col, Input, Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Header } = Layout;
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
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

function HeaderPart() {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
      setIsModalVisible(true);
    };
    const handleOk = () => {
      setIsModalVisible(false);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    //Upload Image Code2
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
  
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
    const [value, setValue] = useState('');

  return (
    <Header>
        <Row>
        <Col span={6}>
            <p className="lefthead">Workflow</p>
        </Col>
        <Col span={12} className="midhead">
            <Input placeholder='Search a workflow' prefix={<SearchOutlined />}></Input>
        </Col>
        <Col span={6} className="midright">
            <Button type="primary" className="headright" onClick={showModal}>Create Workflow</Button>

                <Modal title="Setup Employee" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Row>
                        <Col span={6}>
                            <Upload
                                name="avatar"
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
                        <Col span={8} className="col2para">
                            <p>Employee Name</p>
                            <p>Designation</p>
                            <p>Employee Details</p>
                        </Col>
                        <Col span={10} className="col3field">
                            <Input placeholder="Basic usage" />
                            <Input placeholder="Basic usage" />
                            <TextArea
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Col>
                    </Row>
                </Modal>
        </Col>
        </Row>
  </Header>
  )
}

export default HeaderPart;