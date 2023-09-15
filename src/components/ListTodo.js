
import { useContext, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import authContext from '../Context/TodoContext';
import { Edit,Eye, Trash } from 'react-feather';
import DeleteTodo from './DeleteTodo';
import ViewTodo from './ViewTodo';

function BasicExample() {
    const navigate =useNavigate()
    const handleAddTodo =()=>{
        navigate("/add-todo")
    }
    const [deleteModel, setDeleteModel]=useState(false)
    const [deleteId, setDeleteId]=useState(null)
    const [viewModel, setViewModel]=useState(false)
    const [viewData, setViewId]=useState(null)
    const {valueNew,setValue} = useContext(authContext);
    const updateStatus = (id, newStatus) => {
        // Update the status in the `valueNew` array based on the ID
        const updatedValueNew = valueNew.map((item) => {
          if (item.id === id) {
            return { ...item, status: newStatus };
          }
          return item;
        });
    
        // Update the context state with the updated data
        setValue(updatedValueNew);
      };
  return (
    <div>
    <div className='text-end mx-3 mb-5 mt-4 d-flex justify-content-between'>
    <h3>TODO APP</h3>
    <Button type="button" color="danger" onClick={()=>handleAddTodo()}>Add todo</Button>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Due Date</th>
          <th>status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {valueNew && valueNew.length > 0 &&valueNew.map((data,key)=>{return(
       
        <tr key={key}>
          <td>{key+1}</td>
          <td>{data.title}</td>
          <td>{data.date}</td>
          <td className={data.status ==="Active" ? "bg-success text-white" : 'bg-danger text-white'}>{data.status}</td>
          <td>
          <span className='
          cursor-pointer'> <Edit onClick={()=>navigate("/add-todo",{state : data })}/>
          </span>
          <span onClick={()=>{setViewId(data);setViewModel(!viewModel)}}> <Eye />
          </span>
          <span> <Trash onClick={()=>{setDeleteModel(!deleteModel);setDeleteId(data.id)}}/>
          </span>
          </td>
        </tr>
        )})}
      
        
      </tbody>
     
    </Table>
    {valueNew && valueNew.length === 0 && (
        <h3 className='text-center'>No Data Available</h3>
        )}
        {valueNew  === null && (
            <h3 className='text-center'>No Data Available</h3>
            )}
   <DeleteTodo toggle={()=>setDeleteModel(!deleteModel)} modal={deleteModel} deleteId={deleteId}/>
   <ViewTodo toggle={()=>setViewModel(!viewModel)} modal={viewModel} data={viewData} updateStatus={updateStatus}/>
    </div>
  );
}

export default BasicExample;