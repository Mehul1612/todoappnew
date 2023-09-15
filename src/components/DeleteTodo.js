import React, { useContext } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import authContext from '../Context/TodoContext';
import { toast } from 'react-toastify';

const DeleteTodo = ({modal,toggle,deleteId}) => {
    const {valueNew,setValue} = useContext(authContext);
    const DeleteHandler = ()=>{
        let newValue = valueNew.filter((e)=>e.id !== deleteId)
        setValue(newValue)
        toggle()
        toast.success('Todo deleted successfully', {
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
  return (
    <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Delete todo</ModalHeader>
    <ModalBody>
     Are you sure you want to delete this todo?
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={DeleteHandler}>Delete</Button>{' '}
      <Button color="secondary" onClick={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
  )
}

export default DeleteTodo