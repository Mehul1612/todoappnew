import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col } from 'reactstrap';
import authContext from '../Context/TodoContext';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewTodo = ({modal,toggle,data,updateStatus}) => {
    const options =[ {
        label :"Active",
        value : "Active"
    },
    {
        label :"InActive",
        value : "InActive"
    }]
    const navigate =useNavigate()
    const location =useLocation()
    const idWatch =()=>{
    if(location.state !== null){
        return location.state
    } else{
        navigate("/")
        toggle()
    }

    }
    const [status,setStatus]=useState(null)
    const viewHandler = ()=>{
        setStatus(status); // Update local state
       updateStatus(data.id, status.value);
       toggle()

    }
    useEffect(() => {
        setStatus({label :data?.status ,value :data?.status})
    }, [])
    
  return (
    <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>View todo</ModalHeader>
    <ModalBody>
    <ol>
    <li>
    Title : {data?.title}
    </li>
    <li>
    Description : {data?.des}
    </li>
   
    <li>
    Due Date : {data?.date}
    </li>
    <li>
   Status : {data?.status}
    </li>
    </ol>
    <FormGroup row>
              <Label for="exampleSelect">Select Stauts</Label>
              <Col sm={6}>
              <Select
               options={options}
               placeholder="select"
               value={status}
               onChange={(e)=>setStatus(e)}
               />
              </Col>
            </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={viewHandler}>View</Button>{' '}
      <Button color="secondary" onClick={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
  )
}

export default ViewTodo