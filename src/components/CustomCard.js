import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Input from './Input';
import DropDown from './DropDown';
import Dialogs from './Dialogs';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyImage from '../images/check-list.png';
import '../css/InputBox.css';
import Modal from '@mui/material/Modal';
import { remove } from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // or use any other method to import the remove function
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Header from './Header';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomButton from './CustomButton';
import { createTheme } from '@mui/material/styles';

const FinalDisplay = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('In Progress');
  const [tasks, setTasks] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

  const [openCheckModal, setOpenCheckModal] = useState(false);
  const theme = createTheme();

  const handleCheckIconClick = (task) => {
    setSelectedTaskDetails(task);
    setOpenCheckModal(true);
  };
  const handleCheckModalClose = () => {
    setOpenCheckModal(false);
  };
  const handleMarkCompleted = () => {
    if (selectedTaskDetails) {
      const updatedTasks = tasks.map((task) =>
        task === selectedTaskDetails ? { ...task, status: 'Completed' } : task
      );
      setTasks(updatedTasks);
    }
    handleCheckModalClose();
  };
  const validationSchema = Yup.object({
    taskTitle: Yup.string()
      .trim()
      .required('Please enter task title')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Task title can only contain alphanumeric characters and spaces')
      .min(3, 'Task title must be at least 3 characters long')
    // .max(20, 'Task title cannot exceed 20 characters'),
  });


  const formik = useFormik({
    initialValues: {
      taskTitle: '',
      priority: 'Low',
      status: 'In Progress',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newTask = {
        title: values.taskTitle,
        priority: values.priority,
        status: values.status,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      formik.resetForm();
    },
  });
  const handlePriorityChange = (value) => {
    formik.setFieldValue('priority', value);
    setPriority(value);
  };

  const handleStatusChange = (value) => {
    formik.setFieldValue('status', value);
    setStatus(value);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDetailsClick = (task) => {
    setSelectedTaskDetails(task);
    setOpenDetailsModal(true);
  };

  const handleDetailsModalClose = () => {
    setOpenDetailsModal(false);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteIndex(null);
    setSelectedTaskDetails(null);
  };


  const handleDeleteTask = (index) => {
    const taskToDelete = tasks[index];
    console.log('Task to delete:', taskToDelete);
    setSelectedTaskDetails(taskToDelete);
    setDeleteIndex(index); // Set the index for deletion
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirmed = () => {
    console.log('Delete Index:', deleteIndex);
    if (selectedTaskDetails) {
      const updatedTasks = tasks.filter((task) => task !== selectedTaskDetails);
      setTasks(updatedTasks);
    }
    handleDeleteDialogClose();
  };
  const reversedTasks = tasks.slice(0).reverse(); // Maint
  return (
    <>
      <Header

        backgroundColor="#E7F6DF"
        padding="20px"
        fontFamily="Instrument, serif"
      />


      <Box
        className="OuterDivboxes allFieldsLeftMargin"

      >
        <form onSubmit={formik.handleSubmit}>
          <Input
            updateTitle={(value) => {
              formik.handleChange('taskTitle')(value);
            }}
            taskTitle={formik.values.taskTitle}
            placeholder="Enter Task Title"
            label="Task Title"
            style={{ width: '100%', marginBottom: '0px' }}
            className='inputField'
          />
          {formik.touched.taskTitle && formik.errors.taskTitle ? (
            <div style={{ color: 'red', marginLeft: "20px", marginBottom: "20px", fontWeight: "bold", marginTop: "-20px" }}>{formik.errors.taskTitle}</div>
          ) : null}
          <Box className=' CustomDropdownContainer ' style={{ marginBottom: '20px' }}>
            <DropDown
              label="Priority"
              value={formik.values.priority}
              updateFunction={handlePriorityChange}
              options={[
                { label: 'Low', value: 'Low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' }
              ]}

            />

            <DropDown
              label="Status"
              value={formik.values.status}
              updateFunction={handleStatusChange}
              options={[
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Completed', value: 'completed' }
              ]}

            />


          </Box>






          <CustomButton
            variant="contained"
            color="primary"
            type="submit"
            className='customButton'
            style={{ marginBottom: '30px' }}
            label="Add Task"
          >

          </CustomButton>


        </form>







        
          {tasks.length > 0 && (
            <Box className='card scrollable-content' sx={{
              minHeight: "300px",
              width: "100%",
              maxWidth: "435px",
              minWidth: "300px",
              background: "#E6E6E6",
              borderRadius: "10px",
              paddingLeft: "30px",
              paddingRight: "30px",
              marginBottom: "100px",
              maxHeight: reversedTasks.length > 3 ? '300px' : 'none',
              overflowY: 'auto'
            }}>
              <Box sx={{}}>
                {reversedTasks.map((task, index) => (
                  <Box key={index} className='card mb-2' sx={{
                    position: 'relative',
                    width: "100%",
                    background: task.status === 'Completed' ? '#D1FFBD' : "white",
                    borderRadius: "10px",
                    height: "65px",
                    marginTop: index === 0 ? "20px" : "0",
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {task.status !== 'Completed' ? (
                        <CheckCircleOutlineIcon
                          style={{ color: "grey", cursor: 'pointer', position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                          onClick={() => handleCheckIconClick(task)}
                        />
                      ) : (
                        <CheckCircleOutlineIcon
                          style={{ color: "grey", position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                        />
                      )}
                      <Typography variant="body1" style={{
                        fontSize: '15px',
                        marginTop: "20px",
                        marginLeft: "40px",
                        marginRight: "auto",
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {task.title.length > 15 ? `${task.title.substring(0, 12)}...` : task.title}
                      </Typography>
                      <VisibilityIcon style={{ color: "blue", cursor: 'pointer', position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)' }} onClick={() => handleDetailsClick(task)} />
                      <DeleteIcon style={{ color: "red", cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} onClick={() => handleDeleteTask(tasks.length - 1 - index)} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
    


        <Dialogs
          open={openDeleteDialog}
          handleClose={handleDeleteDialogClose}
          handleConfirmed={handleDeleteConfirmed}
          title="Confirm Delete"
          description="Are you sure you want to delete this task?"
        />

        {/* Details Modal */}
        <Dialogs
          open={openDetailsModal}
          handleClose={handleDetailsModalClose}

          title="Task Details"
          buttonText="Click to hide the detail modal"
          description={
            selectedTaskDetails && (
              <>
                <p><strong>Title:</strong> {selectedTaskDetails.title}</p>
                <p><strong>Priority:</strong> {selectedTaskDetails.priority}</p>
                <p><strong>Status:</strong> {selectedTaskDetails.status}</p>
              </>
            )
          }
        />

        {/* Check Completion Modal */}
        <Dialogs
          open={openCheckModal}
          handleClose={handleCheckModalClose}
          handleConfirmed={handleMarkCompleted}
          title="Mark as Completed"
          description="Are you sure you want to mark this task as completed?"
        />
      </Box>
    </>
  );
}

export default FinalDisplay;
