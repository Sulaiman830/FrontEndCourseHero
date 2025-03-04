import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader'
import HeaderCont from '../../Header/Container/Header';
import {Input,Checkbox,Select,Radio,Button,DatePicker,Form,Divider,Upload, message,} from 'antd';
import { UploadOutlined,PlusOutlined, DeleteTwoTone } from '@ant-design/icons';
import getSearchedCourses from '../../Search/api/getSearchedCourses';
const { Option } = Select;
const { TextArea } = Input;


 
const CreateUi=(props)=>{
  console.log("props",props);
  /* Dropzone React*/

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    props.setResume(allFiles);
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  const Uploadprops = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  

    return(
      <div className='MainCont'>
      <div className='PageWrapper'> 
<HeaderCont/>
 
<div className='container'>
<div className='row'>
    <div className='col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2'></div>
    <div className='col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8'>
    <div className="card">
  <div className="card-header">New Course</div>
  <div className="card-body">
      <div className='row'>
      <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div>
      <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
      <Form onFinish={props.onFinish} name="control-hooks">
          <h6 className='Title mtt-15'> Course Name</h6>
          <Form.Item name="courseName"  rules={[{ required: true }]}> 
          <Input  type='text'/>
            </Form.Item>
          <h6 className='Title mtt-15'> Select Course Type </h6>
          {/* <Radio.Group name="type" defaultValue={'Disciplinary'}>
    <Radio  value='Disciplinary'>Disciplinary</Radio>
    <Radio value='Inter-Disciplinary'>Inter-Disciplinary</Radio>
  </Radio.Group> */}


      <Form.Item name="type"  rules={[{ required: true }]}>
        <Select
          placeholder="Select Course Type"
         
        >
          <Option value="Disciplinary">Disciplinary Course</Option>
          <Option value="Interdisciplinary">Interdisciplinary Course</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
      >
        {({ getFieldValue }) => {
          return getFieldValue('type') === 'Interdisciplinary' ? (
            <div name="customizeType" rules={[{ required: true }]}>

<h6 className='BlkTitle mtt-15'> Enter Main Disciplinary Subject</h6>
<Form.Item name="mainDisciplinarySubject"  rules={[{ required: true }]}> 
              <Input type='text'/>
</Form.Item>
              <h6 className='BlkTitle mtt-15'> Additional Subject</h6>
              <Form.Item name="additionalSubject1"  rules={[{ required: true }]}> 
          <Input type='text'/>
          </Form.Item>
          <h6 className='BlkTitle mtt-15'>Additional Subject</h6>
          <Form.Item name="additionalSubject2"  rules={[{ required: true }]}> 
          <Input type='text'/>
          </Form.Item>
          <h6 className='BlkTitle mtt-15'> Additional Subject</h6>
          <Form.Item name="additionalSubject3"  rules={[{ required: true }]}> 
          <Input type='text'/>
          </Form.Item>
          <hr className='hr-def'/>

            </div>
          ) : getFieldValue('type') === 'Disciplinary' ? (
            <div name="customizeType"  rules={[{ required: true }]}>
               <h6 className='BlkTitle mtt-15'> Enter Main Subject</h6>
               <Form.Item name="mainSubject"  rules={[{ required: true }]}> 
              <Input type='text'/>
              </Form.Item>
              <hr className='hr-def'/>

            </div>): null;
        }}
      </Form.Item>
      
  
      <h6 className='Title mtt-15'> Mode</h6>
      <Form.Item name="mode"  rules={[{ required: true }]}> 
          <Radio.Group name="radiogroup" defaultValue={'online'}>
    <Radio value={'Online'}>Online</Radio>
    <Radio  value={'Offline'}>Offline</Radio>
  </Radio.Group>
</Form.Item>
  <h6 className='Title mtt-15'> Course Language</h6>
  <Form.Item name="courseLanguage"  rules={[{ required: true }]}> 
         <Select
    style={{ width: '100%' }}
  
    optionLabelProp="label"
  >
    <Option value="English" label="Englishn">
      
    English
      
    </Option>
    <Option value="Urdu" label="Urdu">
     
    Urdu
      
    </Option>
    <Option value="Arabic" label="Arabic">
     
    Arabic
    
    </Option>
  </Select>
       </Form.Item>
  <h6 className='Title mtt-15'> Course Importance & Breakdown </h6>
  <Form.Item name="courseBreakDown"  rules={[{ required: true }]}> 
  <TextArea rows={4} showCount maxLength={100} placeholder='Brielfy explain the course breakdown' />
</Form.Item>
  <h6 className='Title'> Faculty Name</h6>
  <Form.Item name="facultyName"  rules={[{ required: true }]}> 
       <Input/>
</Form.Item>
          <h6 className='Title mtt-15'> Faculty Resume</h6>
          <Form.Item name="facultyResume"> 

          <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      maxFiles={1}
      onSubmit={handleSubmit}
      styles={{ dropzone: { minHeight: 80} }}
    />


          {/* <Upload {...Uploadprops} >
    <Button style={{width:'100%'}} icon={<UploadOutlined />}>Upload CV</Button>
  </Upload> */}
  
  </Form.Item>


          {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone> */}


  <Divider><label> or  </label></Divider>
  {/* <Link to='/Faculty/Reg' target="_blank">
         <Button type="default" block>
      Create Resume
       </Button>
       </Link>  */}

          <h6 className='Title mtt-15'> Course Specification</h6>
          <Form.Item name="courseSpecification"  rules={[{ required: true }]}> 
          <Select
    style={{ width: '100%' }}
   
    optionLabelProp="label"
  >
    <Option value="Certificate" label="Certificate">
      
   Certificate
      
    </Option>
    <Option value="Non-Certificate" label="Non-Certificate">
     
    Non-Certificate
      
    </Option>
    <Option value="Certificate/Credit" label="Certificate/Credit">
     
    Certificate/Credit
    
    </Option>
  </Select>
</Form.Item>

  <h6 className='Title mtt-15'> Course Offering Institute</h6>
  <Form.Item name="courseOfferingInstitute"  rules={[{ required: true }]}> 
         <Input type='text'/>
         </Form.Item>
         <h6 className='Title mtt-15'> Institue Web Address</h6>
         <Form.Item name="instituteWebAddress"  rules={[{ required: true }]}> 
         <Input type='text'/>
         </Form.Item>
         <h6 className='Title mtt-15'>Add Institute Details</h6>
         <Form.Item name="instituteDetails"  rules={[{ required: true }]}> 
         <TextArea rows={4} showCount maxLength={100} placeholder='Brielfy explain the details' />
</Form.Item>
         {/* <Divider><label> Add Institute Complete Profile </label></Divider>
         <Link to='/Institute/Reg' target="_blank">
         <Button type="default" block>
       Register Institiute 
       </Button>
       </Link>  */}

         <h6 className='Title mtt-15'>Teaching Medium Institute</h6>
         <Form.Item name="mediumInstitute"  rules={[{ required: true }]}> 
         <Input   type='text'/>
         </Form.Item>
         <h6 className='Title mtt-15'>Teaching Medium Institue Web Address</h6>
         <Form.Item name="mediumInstituteWebAddress"  rules={[{ required: true }]}> 
         <Input type='text'/>
         </Form.Item>
         <h6 className='Title mtt-15'>Add Institute Details</h6>
         <Form.Item name="mediumInstituteDetails"  rules={[{ required: true }]}> 
 <TextArea rows={4} showCount maxLength={100} placeholder='Brielfy explain the details' />
 </Form.Item>

         {/* <Divider><label> Add Institute Complete Profile </label></Divider>
         <Link to='/Institute/Reg' target="_blank">
         <Button type="default" block>
       Register Institiute 
       </Button>
       </Link> */}

       <h6 className='Title mtt-15'> Course Country</h6>
       <Form.Item name="courseCountry"  rules={[{ required: true }]}> 
         <Select
    style={{ width: '100%' }}
    optionLabelProp="label"
  >
    <Option value="Pakistan" label="Pakistan">
      
    Pakistan
      
    </Option>
    <Option value="Saudi Arabia" label="Saudi Arabia">
     
    Saudi Arabia
      
    </Option>
    <Option value="China" label="China">
     
    China
    
    </Option>
  </Select>
</Form.Item>
  <h6 className='Title mtt-15'> Course City</h6>
  <Form.Item name="courseCity"  rules={[{ required: true }]}> 
         <Select
    style={{ width: '100%' }}
    optionLabelProp="label"
  >
    <Option value="Islamabad" label="Islamabad">
      
  Islamabad
      
    </Option>
    <Option value="Wah Cantt" label="Wah Cantt">
     
    Wah Cantt
      
    </Option>
    <Option value="Peshawar" label="Peshawar">
     
    Peshawar
    
    </Option>
  </Select>
  </Form.Item>

          <h6 className='Title mtt-15'> Duration</h6>
          <Form.Item name="duration"  rules={[{ required: true }]}> 
         <Input type='number'/>
         </Form.Item>
         <h6 className='Title mtt-15'> Duration For</h6>
         <Form.Item name="durationFor"  rules={[{ required: true }]}> 
         <Input type='text'/>
   
 </Form.Item>

  <h6 className='Title mtt-15'> Hours Per week</h6>
  <Form.Item name="hoursPerWeek"  rules={[{ required: true }]}> 
         <Input type='number'/>
</Form.Item>
         <h6 className='Title mtt-15'> Total Cost</h6>
         <Form.Item name="totalCost"  rules={[{ required: true }]}> 
         <Input type='number'/>
</Form.Item>
         <h6 className='Title mtt-15'> Currency</h6>
         <Form.Item name="currency"  rules={[{ required: true }]}> 
         <Select
    style={{ width: '100%' }}
    optionLabelProp="label"
  >
    <Option value="$" label="$">
      
    $
      
    </Option>
  </Select>
  </Form.Item>
 
      
         <h6 className='Title mtt-15'> Financial Aid</h6>
         <Form.Item name="financialAid"  rules={[{ required: true }]}> 
         <Radio.Group name="radiogroup" defaultValue={'online'}>
    <Radio value={'Yes'}>Yes</Radio>
    <Radio  value={'No'}>No</Radio>
  </Radio.Group>
  </Form.Item>

  <h6 className='Title mtt-15'> Financial Aid Details </h6>
  <Form.Item name="financialAidDetails"  rules={[{ required: true }]}> 
          <TextArea rows={3} />
          </Form.Item>
          <h6 className='Title mtt-15'>Starting Date </h6>
          <Form.Item name="startingDate"  rules={[{ required: true }]}> 
          <DatePicker style={{width:'100%'}}  />
          </Form.Item>
          <h6 className='Title mtt-15'> Application Deadline </h6>
          <Form.Item name="endingDate"  rules={[{ required: true }]}> 
          <DatePicker  style={{width:'100%'}}  />
          </Form.Item>
          <h6 className='BlkTitle mtt-15'>Is this course is a part of any other program/degree ?  </h6>
  <hr className='hr-def mb-0'/>
  
  <Form.Item name="part"  rules={[{ required: true }]}>
        <Select
          placeholder="Specify Course"
         
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.part !== currentValues.part}
      >
        {({ getFieldValue }) => {
          return getFieldValue('part') === 'Yes' ? (
            <div name="customizeType" rules={[{ required: true }]}>

<h6 className='Title mtt-15'> Program Specification</h6>
<Form.Item name="programSpecs"  rules={[{ required: true }]}> 
<Select
    style={{ width: '100%' }}
    optionLabelProp="label"
  >
     <Option value="Certificate" label="Certificate">
      
     Certificate
        
        </Option>
    <Option value="Associate" label="Associate">
      
    Associate
      
      </Option>
     <Option value="Bachelor's" label="Bachelor's">
      
      Bachelor's
      
      </Option>
       <Option value="Master's" label="Master's">
     
     Master's
     
     </Option>
    
   
    <Option value="PHD" label="PHD">
     
    PHD
      
    </Option>
    <Option value="Post Doc" label="Post Doc">
      
      Post Doc
        
      </Option>
 
  </Select>
  </Form.Item>

              <h6 className='Title mtt-15'> Program Name</h6>
              <Form.Item name="programName"  rules={[{ required: true }]}> 
              <Input type='text'/>
</Form.Item>
              <h6 className='Title mtt-15'> Program Type</h6>
              <Form.Item name="ProgramType"  rules={[{ required: true }]}>
        <Select
          placeholder="Select Course Type"
         
        >
          <Option value="Disciplinary">Disciplinary Course</Option>
          <Option value="Interdisciplinary">Interdisciplinary Course</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
      >
        {({ getFieldValue }) => {
          return getFieldValue('ProgramType') === 'Interdisciplinary' ? (
            <div name="customizeType" rules={[{ required: true }]}>

<h6 className='BlkTitle mtt-15'> Enter Main Disciplinary Subject</h6>
<Form.Item name="DisciplinarySubject"  rules={[{ required: true }]}> 
              <Input type='text'/>
</Form.Item>
              <h6 className='BlkTitle mtt-15'> Additional Subject</h6>
              <Form.Item name="programAdditionalSubject1"  rules={[{ required: true }]}> 
          <Input type='text'/>
          </Form.Item>
          <h6 className='BlkTitle mtt-15'>Additional Subject</h6>
          <Form.Item name="programAdditionalSubject2"  rules={[{ required: true }]}> 
          <Input type='text'/>
          </Form.Item>
          <h6 className='BlkTitle mtt-15'> Additional Subject</h6>
          <Form.Item name="programAdditionalSubject3"  rules={[{ required: true }]}> 
          <Input type='text'/>
          </Form.Item>
          <hr className='hr-def'/>

            </div>
          ) : getFieldValue('type') === 'ProgramDisciplinary' ? (
            <div name="customizeType"  rules={[{ required: true }]}>
               <h6 className='BlkTitle mtt-15'> Enter Main Subject</h6>
               <Form.Item name="mainSubject"  rules={[{ required: true }]}> 
              <Input type='text'/>
              </Form.Item>
              <hr className='hr-def'/>

            </div>): null;
        }}
      </Form.Item>
      

      <Form.List name="degree">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <div key={field.key} style={{ display: 'flex',flexDirection:'column', marginBottom: 8 }} align="baseline">
               
  <h6 className='BlkTitle mtt-15'> Add Program Details </h6>
  <hr className='hr-def mb-0'/>
  <h6 className='Title mtt-15'> Program Specification</h6>
                <Form.Item
                  {...field}
                  name={[field.name, 'specification']}
                  fieldKey={[field.fieldKey, 'specification']}
                  rules={[{ required: true, message: 'Missing specification' }]}
                >
                  

<Select
    style={{ width: '100%' }}
    optionLabelProp="label"
  >
     <Option value="Certificate" label="Certificate">
      
     Certificate
        
        </Option>
    <Option value="Associate" label="Associate">
      
    Associate
      
      </Option>
     <Option value="Bachelor's" label="Bachelor's">
      
      Bachelor's
      
      </Option>
       <Option value="Master's" label="Master's">
     
     Master's
     
     </Option>
    
   
    <Option value="PHD" label="PHD">
     
    PHD
      
    </Option>
    <Option value="Post Doc" label="Post Doc">
      
      Post Doc
        
      </Option>
 
  </Select>

                </Form.Item>
                <h6 className='Title mtt-15'> Program Name</h6>
                <Form.Item
                  {...field}
                  name={[field.name, 'programName']}
                  fieldKey={[field.fieldKey, 'programName']}
                  rules={[{ required: true, message: 'name' }]}
                >
                      
              <Input type='text'/>
                </Form.Item>
                <h6 className='Title mtt-15'> Program Type</h6>
                <Form.Item
                  {...field}
                  name={[field.name,'programType']}
                  fieldKey={[field.fieldKey, 'programType']}
                  rules={[{ required: true, message: 'Missing type' }]}
                >
                     
             
        <Select
          placeholder="Select Course Type"
         
        >
          <Option value="ProgramDisciplinary">Disciplinary Course</Option>
          <Option value="ProgramInterdisciplinary">Interdisciplinary Course</Option>
        </Select>
    
      {/* <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
      >
        {({ getFieldValue }) => {
          return getFieldValue(' programType') === 'ProgramInterdisciplinary' ? (
            <div name="customizeType" rules={[{ required: true }]}>

<h6 className='BlkTitle mtt-15'> Enter Main Disciplinary Subject</h6>
              <h6 className='BlkTitle mtt-15'> Enter Main Disciplinary Subject</h6>
              <Form.Item name="mainDisciplinarySubject1"  rules={[{ required: true }]}>
              <Input type='text'/>
              </Form.Item>

              <h6 className='BlkTitle mtt-15'> Additional Subject</h6>
              <Form.Item name="addionalSubject11"  rules={[{ required: true }]}>
          <Input type='text'/>
          </Form.Item>
          <h6 className='BlkTitle mtt-15'>Additional Subject</h6>
          <Form.Item name="acditionalSubject22"  rules={[{ required: true }]}>
          <Input type='text'/>
          </Form.Item>
          <h6 className='BlkTitle mtt-15'> Additional Subject</h6>
          <Form.Item name="additionalSubject33"  rules={[{ required: true }]}>
          <Input type='text'/>
                </Form.Item>
          <hr className='hr-def'/>

            </div>
          ) : getFieldValue('programType') === 'ProgramDisciplinary' ? (
            <div name="customizeType"  rules={[{ required: true }]}>
               <h6 className='BlkTitle mtt-15'> Enter Main Subject</h6>
               <Form.Item name="mainSubject"  rules={[{ required: true }]}>
              <Input type='text'/>
              </Form.Item>
              <hr className='hr-def'/>

            </div>): null;
        }}
      </Form.Item> */}
      

                </Form.Item>

             

                <DeleteTwoTone twoToneColor='red' className='mtt-10' onClick={() => remove(field.name)} />
              </div>
            ))}
            {/* <div className='mtt-10'>
              <Button style={{width:'100%'}} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Another Program
              </Button>
            </div> */}
          </>
        )}
      </Form.List>
     
          <hr className='hr-def'/>

            </div>
          ) : null;
        }}
      </Form.Item>

          {/* <h6 className='Title mtt-15'> Course Overview</h6>
          <TextArea onChange={(e)=>props.setCourseOverView(e.target.value)}   rows={3} />
          <h6 className='Title mtt-15'> Course Content</h6>
          <TextArea  onChange={(e)=>props.setCourseContent(e.target.value)} rows={3} /> */}
          
         

          {/* <Select
    style={{ width: '100%' }}
    onChange={handleChangeMode}
    optionLabelProp="label"
  >
    <Option value="online" label="Online">
      
    online
      
    </Option>
    <Option value="offline" label="offline">
     
   offline 
       </Option>
  </Select> */}
         {/* <h6 className='Title mtt-15'> Course Info</h6>
         <TextArea onChange={(e)=>props.setCourseInfo(e.target.value)} rows={3} /> */}
         {/* <h6 className='Title mtt-15'> Subject Category</h6>
         <Select
    style={{ width: '100%' }}
    onChange={handleChangeCategory}
    optionLabelProp="label"
  >
    <Option value="HCI" label="HCI">
      
  Human Computer Interaction
      
    </Option>
    <Option value="Automata Thoery" label="Automata Thoery">
     
    Automata Thoery
      
    </Option>
    <Option value="Data Structures" label="Data Structures">
     
    Data Structures
    
    </Option>
  </Select> */}
         
       
        
         {/* <Radio onChange={()=>props.setFinancialAid('yes')}>Yes</Radio> &nbsp; &nbsp; &nbsp; <Radio onChange={()=>props.setFinancialAid('no')}>No</Radio>  */}
         
       <hr className='hr-def'/>
          <div className='text-center mtt-5'>
              <Button htmlType='submit' type='primary'> Submit </Button>
          </div>
          </Form> 
      </div>
      <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'></div>
     
      </div>
      </div>
      </div>
    </div>
    <div className='col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2'></div>
    </div>
    </div>
    
        </div>
        </div>
    )
}
export default CreateUi