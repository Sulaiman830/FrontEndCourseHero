import React,{useState} from 'react';
// import ImgCrop from 'antd-img-crop';

import HeaderCont from '../../Header/Container/Header';
import Dropzone from 'react-dropzone-uploader'
import {Input,Checkbox,Select,Radio,Button,DatePicker,Upload, Form} from 'antd';
import {InboxOutlined,  MinusCircleTwoTone, PlusOutlined, PropertySafetyFilled } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;



const InstituteRegUi=(props)=>{

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  /* Dropzone React*/

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

    return(

        <div className='MainCont'>
        <div className='PageWrapper'> 
<HeaderCont/>
   
  <div className='container'>
  <div className='row'>
      <div className='col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2'></div>
      <div className='col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8'>
      <div className="card">
    <div className="card-header">Institute Registration</div>
    <div className="card-body">
        <div className='row'>
        <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div>
        <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
        <Form
        onFinish={props.onFinish}
         name="dynamic_form_nest_item" autoComplete="off">
        <h6 className='Title'> Institute Type</h6>
        <Form.Item name="instituteType"  rules={[{ required: true }]}>  
          <Select
    style={{ width: '100%' }}
    optionLabelProp="label"
  >
    <Option value="University" label="University">
      
    University
      
    </Option>
    <Option value="College" label="College">
     
    College
      
    </Option>
    <Option value="School" label="School">
     
    School
    
    </Option>
  </Select>
</Form.Item>
  <h6 className='Title mtt-15'> Institute Name</h6>
  <Form.Item name="instituteName"  rules={[{ required: true }]}> 
          <Input type='text'/>
</Form.Item>
          <h6 className='Title mtt-15'> Institute Mode</h6>
          <Form.Item name="institutionMode"  rules={[{ required: true }]}> 
          <Select
    style={{ width: '100%' }}
    optionLabelProp="label"
  >
    <Option value="Individual" label="Individual">
      
    Individual
      
    </Option>
    <Option value="Institution" label="Institution">
     
    Institution
      
    </Option>
   
  </Select>
</Form.Item>

  <h6 className='Title mtt-15'> Web Address </h6>
  <Form.Item name="instituteWebAddress"  rules={[{ required: true }]}> 
    <Input type='text' name='Website'/>
</Form.Item>
  <h6 className='Title mtt-15'> Email Address </h6>
  <Form.Item name="instituteEmail"  rules={[{ required: true }]}> 
    <Input type='text' name='Email'/>
</Form.Item>
    <h6 className='Title mtt-15'> Phone Number </h6>
    <Form.Item name="institutePhoneNumber"  rules={[{ required: true }]}> 
    <Input type='text' name='Phone Number'/>
</Form.Item>
    <h6 className='Title mtt-15'> Whatsapp Number </h6>
    <Form.Item name="instituteWhatsAppNumber"  rules={[{ required: true }]}> 
    <Input type='text' name='Whatsapp Number'/>
</Form.Item>
    <h6 className='Title mtt-15'> Institute Address </h6>
    <Form.Item name="instituteAddress"  rules={[{ required: true }]}> 
    <Input type='text' name='Address'/>
</Form.Item>
    <h6 className='Title mtt-15'> Upload Pictures </h6>
    <Form.Item name="imageSet">
    {/* <ImgCrop rotate> */}
   
      {/* <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={props.fileList}
        onChange={props.onChange}
        onPreview={props.onPreview}
      >
        {props.fileList.length < 5 && '+ Upload'}
      </Upload> */}

<Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      styles={{ dropzone: { minHeight: 80} }}
    />
      
    {/* </ImgCrop> */}
    </Form.Item>


          <h6 className='Title mtt-15'> List of Campuses </h6>
          <Form.Item name="instituteCampus"  rules={[{ required: true }]}> 
          <Input placeholder="campus name"  />
          </Form.Item>
          <Form.List name="campuses">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div  style={{ display: 'flex',flexDirection:'column', marginBottom: 8 }}
                required={false}
                key={field.key}
              >
                  <div className='row mtt-5'>
                      <div className='col-lg-11 col-sm-11 col-11 col-md-11 col-xl-11'>
                      <Form.Item
                  {...field}
                  key={field.key}
                  name={field.name}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input campus's name or delete this field.",
                    },
                  ]}
                >
                  <Input placeholder="campus name"  />
                </Form.Item>
                      </div>

                      <div className='col-lg-1 col-sm-1 col-1 col-md-1 col-xl-1'>
                     
                  <MinusCircleTwoTone
                    onClick={() => remove(field.name)}
                  />
              
                      </div>
                      </div> 
            
                
              </div>
            ))}
            <div className='text-center mtt-10'>
              <Button
             style={{width:'100%'}}
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add another campus
              </Button>
             
              <Form.ErrorList errors={errors} />
            </div>
          </>
        )}
      </Form.List>
    
    
      <h6 className='Title mtt-15'> List of Departments </h6>
      <Form.Item name="instituteDepartments"  rules={[{ required: true }]}> 
          <Input placeholder="department name"  />
          </Form.Item>
          <Form.List name="department">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div  style={{ display: 'flex',flexDirection:'column', marginBottom: 8 }}
                required={false}
                key={field.key}
              >
                  <div className='row mtt-5'>
                      <div className='col-lg-11 col-sm-11 col-11 col-md-11 col-xl-11'>
                      <Form.Item
                    
                  {...field}
                  key={field.key}
                  name={field.name}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input department's name or delete this field.",
                    },
                  ]}
                >
                  <Input placeholder="department name"  />
                </Form.Item>
                      </div>

                      <div className='col-lg-1 col-sm-1 col-1 col-md-1 col-xl-1'>
                     
                  <MinusCircleTwoTone
                    onClick={() => remove(field.name)}
                  />
              
                      </div>
                      </div> 
            
                
              </div>
            ))}
            <div className='text-center mtt-10'>
              <Button
             style={{width:'100%'}}
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add another department
              </Button>
             
              <Form.ErrorList errors={errors} />
            </div>
          </>
        )}
      </Form.List>
    

      <h6 className='Title mtt-15'> List of Programs </h6>
      <Form.Item name="institutePorgram"  rules={[{ required: true }]}> 
          <Input placeholder="program name"  />
          </Form.Item>
          <Form.List name="program">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div  style={{ display: 'flex',flexDirection:'column', marginBottom: 8 }}
                required={false}
                key={field.key}
              >
                  <div className='row mtt-5'>
                      <div className='col-lg-11 col-sm-11 col-11 col-md-11 col-xl-11'>
                      <Form.Item
                   
                  {...field}
                  name={field.name}
                  key={field.key}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input program's name or delete this field.",
                    },
                  ]}
                >
                  <Input placeholder="program name"  />
                </Form.Item>
                      </div>

                      <div className='col-lg-1 col-sm-1 col-1 col-md-1 col-xl-1'>
                     
                  <MinusCircleTwoTone
                    onClick={() => remove(field.name)}
                  />
              
                      </div>
                      </div> 
            
                
              </div>
            ))}
            <div className='text-center mtt-10'>
              <Button
              style={{width:'100%'}}
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add another program 
              </Button>
             
              <Form.ErrorList errors={errors} />
            </div>
          </>
        )}
      </Form.List>
    
    
      <h6 className='Title mtt-15'> List of Faculty </h6>
      <Form.Item name="facultyList"  rules={[{ required: true }]}> 
          <Input placeholder="faculty name"  />
          </Form.Item>
          <Form.List name="faculty">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div  style={{ display: 'flex',flexDirection:'column', marginBottom: 8 }}
                required={false}
                key={field.key}
              >
                  <div className='row mtt-5'>
                      <div className='col-lg-11 col-sm-11 col-11 col-md-11 col-xl-11'>
                      <Form.Item
                     
                  {...field}
                  name={field.name}
                  key={field.key}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input faculty's name or delete this field.",
                    },
                  ]}
                >
                  <Input placeholder="faculty name"  />
                  
                </Form.Item>
                      </div>

                      <div className='col-lg-1 col-sm-1 col-1 col-md-1 col-xl-1'>
                     
                  <MinusCircleTwoTone
                    onClick={() => remove(field.name)}
                  />
              
                      </div>
                      </div> 
            
                
              </div>
            ))}
            <div className='text-center mtt-10'>
              <Button
            style={{width:'100%'}}
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add another faculty
              </Button>
             
              <Form.ErrorList errors={errors} />
            </div>
          </>
        )}
      </Form.List>
    
    
      <h6 className='Title mtt-15'> Student Facilitation </h6>
      <Form.Item name="instituteFacilitation"  rules={[{ required: true }]}> 
  <TextArea rows={4} showCount maxLength={100} />
</Form.Item>
  <h6 className='Title'> Mark of Distinction </h6>
  <Form.Item name="instituteMarkOfDistinction"  rules={[{ required: true }]}> 
  <TextArea rows={4} showCount maxLength={1000} placeholder='What is different about your institution?' />
</Form.Item>

      <div className='mtt-10 text-center'>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>

</Form>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
    )
}


export default InstituteRegUi