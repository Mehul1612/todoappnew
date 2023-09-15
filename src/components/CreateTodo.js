import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../Context/TodoContext';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateTodo = () => {
    const {
        register,
        trigger,
        getValues,
        reset,
        formState: { errors },
      } = useForm();
     const [status,setStatus]=useState(null)
    const {valueNew,setValue} = useContext(authContext);

      const {
        ref : titleRef , ...titleRest
      } = register("title",{
        required : {
            value :true,
            message : "Enter Title"
        }
      })
      const {
        ref : dateRef , ...dateRest
      } = register("date",{
        required : {
            value :true,
            message : "Enter Date"
        }
      })
      const {
        ref : desRef , ...desRest
      } = register("des",{
        required : {
            value :true,
            message : "Enter Description"
        }
      })
    const options =[ {
        label :"Active",
        value : "Active"
    },
    {
        label :"InActive",
        value : "InActive"
    }]
    const location =useLocation()
    useEffect(() => {
        if(location.state !==null){
            reset({
                
            ...location?.state
            })
            
            setStatus({label : location.state?.status ,value : location.state?.status})
        }
     
    }, [])
    
    const navigate =useNavigate()
    const submitHandler = async()=>{
        const value =getValues()
        const result =await trigger(["title","date","des"])
        if(result && status !== null){
            value.status =status.value
            value.id= new Date().getTime()
            setValue(valueNew !== null ? [...valueNew,value] : [value])
            navigate("/")
            toast.success('Todo added successfully', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
         });
            
        } else if(!result) {
            toast.error('Please fill required field!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
         });
        } else {
            toast.error('Please select the status!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
         });
        }
    } 
    const EditHandler = ()=>{
        const updatedData = getValues();
        updatedData.status = status ? status.value : '';

  // Check if location.state has an id
  if (location.state && location.state.id) {
    // Find the index of the item with the matching id
    const indexToUpdate = valueNew.findIndex((item) => item.id === location.state.id);

    if (indexToUpdate !== -1) {
      // Update the item with the new data
      const updatedValueNew = [...valueNew];
      updatedValueNew[indexToUpdate] = updatedData;

      // Update the context state with the updated data
      setValue(updatedValueNew);

      // Navigate back to the list or do any other necessary actions
      navigate('/');
    }
  }
    }
    return (
          <Form className='mt-5'>
          <h3 className='text-center my-5 me-5 '>TODO {location.state !== null ? "Update" : "Create"}</h3>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Title</Label>
              <Col sm={6}>
                <div>
                <Input type="text" name="email" id="exampleEmail" placeholder="Enter Title" innerRef={titleRef} {...titleRest} onBlur={async()=>await trigger("title")} errors={errors}/>
                <p className="error-msg text-start"> {errors["title"]?.message} </p>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>Due Date</Label>
              <Col sm={6}>
                <Input type="text" name="date" id="date" placeholder="Enter Date"  innerRef={dateRef} {...dateRest} onBlur={async()=>await trigger("date")} errors={errors}/>
                <p className="error-msg text-start"> {errors["date"]?.message} </p>
              </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="description" sm={2}> Description</Label>
            <Col sm={6}>
              <Input type="textarea" name="description" id="description" placeholder="Enter description" innerRef={desRef} {...desRest} onBlur={async()=>await trigger("des")} errors={errors}/>
              <p className="error-msg text-start"> {errors["des"]?.message} </p>
            </Col>
          </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" sm={2}>Select</Label>
              <Col sm={6}>
              <Select
               options={options}
               placeholder="select"
               value={status}
               onChange={(e)=>setStatus(e)}
               />
              </Col>
            </FormGroup>
            {location.state !== null ? (
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={()=>EditHandler()}>Edit</Button>
              </Col>
            </FormGroup>
            ) :  (<FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button onClick={()=>submitHandler()}>Submit</Button>
            </Col>
          </FormGroup>)}
          </Form>
    )
}
  


export default CreateTodo;

