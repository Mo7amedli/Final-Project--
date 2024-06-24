import React, { useEffect, useState } from 'react';
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import Cookie from 'cookie-universal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './CSS.css'
import moment from 'moment';

function FreeAppliedTasks() {
  const navigate = useNavigate();
  const [appliedTasks, setAppliedTasks] = useState([]);
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');

  useEffect(() => {
    fetchAppliedTasks();
  }, []);

  const fetchAppliedTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/ApplyTasks/Freelancer-Applied-Tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setAppliedTasks(response.data.sort((a, b) => moment(b.orderDate).unix() - moment(a.orderDate).unix()));
    } catch (error) {
      const errorPages = error.response.status;
      if (errorPages === 403) {
        navigate('/error403');
      } else if (errorPages === 401) {
        navigate('/error401');
      } else if (errorPages === 500) {
        navigate('/error500');
      } else {
        console.log(error.response);
      }
    }
  };

  //delete applied task
  const deleteTask = async (taskId, title) => {
    try {
      const response = await axios.put(`${baseUrl}/api/ApplyTasks/Freelancer-Delete-Task?taskId=${taskId}`, { taskId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAppliedTasks();
      toast.success(`The deleting ${title} has been successfully.`);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div style={{ minHeight: '87vh' }}>
  <div className="apply-tasks-container">
    <h2 className="mt-2">Applied Tasks</h2>
    {appliedTasks.length > 0 ? (
      <div className="apply-tasks-list">
        {appliedTasks.map((appliedTask) => (
          <div key={appliedTask.taskId} className="apply-task-container">
            <div className="apply-task-header">
              <h3 className="apply-task-title">{appliedTask.categoryName}</h3>
              <span className={`apply-task-label mb-2 ${appliedTask.status === 'Rejected' ? 'text-danger' : appliedTask.status === 'Accepted' ? 'text-primary' : appliedTask.status === 'Pending' ? 'text-success' : ''}`}>( {appliedTask.status} )</span>
            </div>
            <div className="apply-task-details">
              <div className='d-flex justify-content-center '>
                <h3 className="apply-task-title mt-1">{appliedTask.tasktitle} </h3>
                <span className="apply-task-label" style={{marginTop:'2px'}}> offer( ${appliedTask.totalAmount} )</span>
              </div>
              <p>
                <span className="apply-task-label">Job description:</span> {appliedTask.taskDescription}
              </p>
              <p>
                <span className="apply-task-label">Offer description:</span>{appliedTask.offerDescription}
              </p>
              <div className="d-flex justify-content-evenly">
                <p>
                <span className="apply-task-label">Order Date:</span>
                {moment(appliedTask.orderDate).format('DD-MM-YYYY')}
                </p>
                <p>
                <span className="apply-task-label">Delivery Date:</span>
                {moment(appliedTask.deliveryDate).format('DD-MM-YYYY')}
                </p>
              </div>
              <p className='appliebd-client-name'>
                <span className="apply-task-label">Client Name:</span> {appliedTask.clientFullName}
              </p>
            </div>
            <div className="apply-task-actions">
              <button className="cancel-button" onClick={() => deleteTask(appliedTask.taskId, appliedTask.tasktitle)} >Cancel</button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-jobs">
        <h1>Please check the jobs first and apply on the tasks you want</h1>
      </div>
    )}
  </div>
  <ToastContainer position="top-center" />
</div>
  );
}

export default FreeAppliedTasks;