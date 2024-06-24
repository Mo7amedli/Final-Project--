import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import './CSS.css'
import ChatModal from '../Chat/ChatModal';
function AcceptesTasks() {
    const navigate = useNavigate();
    const [acceptedTasks, setAcceptedTasks] = useState([]);
    const cookies = Cookie();
    const token = cookies.get('freelanceCookie');

    useEffect(() => {
        fetchAcceptedTasks();
    }, []);

    //fetch the accepts tasks to do them
    const fetchAcceptedTasks = async () => {
        try {
        const response = await axios.get(`${baseUrl}/api/ApplyTasks/Freelancer-Accepted-Tasks`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        setAcceptedTasks(response.data.sort((a, b) => moment(b.orderDate).unix() - moment(a.orderDate).unix()));
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

    //open chat modal
    const [modalOpen, setModalOpen] = useState(false);
    const [userId, setUserId] = useState();
    const [recipientId, setRecipientId] = useState();
    const [recipient, setRecipient] = useState(false);
    const openChatModal = (clientId, freelancerId, freelancerName) => {
      setUserId(clientId);
      setRecipientId(freelancerId);
      setRecipient(freelancerName);
      setModalOpen(true);
    };
    const closeChatModal = () => {
      setModalOpen(false);
    };

  return (
    <div style={{minHeight:'87vh'}}>
      <div className="apply-tasks-container">
        <h2 className="mt-2">Accepted Tasks</h2>
        {acceptedTasks.length > 0 ? (
          <div className="apply-tasks-list">
            {acceptedTasks.map((acceptedTask) => (
              <div key={acceptedTask.id} className="apply-task-container">
                <div className="apply-task-details">
                  <div className='d-flex justify-content-center'>
                    <h3 className="apply-task-title mt-1">{acceptedTask.tasktitle} </h3>
                    <span className='apply-task-label' style={{marginTop:'2px'}}> ${acceptedTask.totalAmount}</span>
                  </div>
                  <p>
                    <span className="apply-task-label">Description:</span> {acceptedTask.taskDescription}
                  </p>
                  <p className='accepted-price'>
                    <span className="apply-task-label">Price:</span> {acceptedTask.totalAmount}
                  </p>
                  <div className="d-flex justify-content-evenly">
                    <p>
                    <span className="apply-task-label">Order Date:</span>
                    {moment(acceptedTask.orderDate).format('DD-MM-YYYY')}
                    </p>
                    <p>
                    <span className="apply-task-label">Delivery Date:</span>
                    {moment(acceptedTask.deliveryDate).format('DD-MM-YYYY')}
                    </p>
                  </div>
                  <p className='appliebd-client-name'>
                    <span className="apply-task-label">Client Name:</span> {acceptedTask.clientFullName}
                  </p>
                </div>
                <div className="apply-task-actions">
                  <button className="chat-button" onClick={()=>{openChatModal(acceptedTask.freelancerId,acceptedTask.clientId,acceptedTask.clientFullName)}} >Chat</button>
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
      <ChatModal isOpen={modalOpen} closeModal={closeChatModal} userId={userId} recipientId={recipientId} recipient={recipient} token={token}/>
      <ToastContainer position="top-center"/>
    </div>
  )
}

export default AcceptesTasks;