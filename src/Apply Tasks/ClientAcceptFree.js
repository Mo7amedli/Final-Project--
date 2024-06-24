import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import ChatModal from '../Chat/ChatModal';
function ClientAcceptFree() {

  const navigate = useNavigate();
  const [acceptedFrees, setAcceptedFrees] = useState([]);
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');
  useEffect(() => {
      fetchAcceptedFrees();
  }, []);
  //fetch the accepts tasks to do them
  const fetchAcceptedFrees = async () => {
      try {
      const response = await axios.get(`${baseUrl}/api/ApplyTasks/Get-Accept-Client- Applicants`, {
          headers: {
          Authorization: `Bearer ${token}`,
          },
      });
      console.log(response.data);
      setAcceptedFrees(response.data);
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
    
    const navigateToContract = (FreelancerId, JobPostId)=>{
      navigate(`/create-contract/${FreelancerId}/${JobPostId}`);
    }

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
    <div style={{ minHeight: '87vh' }}>
  <div className="apply-tasks-container">
    <h2 className="mt-2">Accepted Applicants</h2>
    {acceptedFrees.length > 0 ? (
      <div className="apply-tasks-list">
        {acceptedFrees.map((acceptedTask) => (
          <div key={acceptedTask.taskId} className="apply-task-container">
            <div className="apply-task-details">
              <p className='d-flex justify-content-center'>
                <h3 className="apply-task-title mt-1">{acceptedTask.tasktitle} </h3>
                <span className="apply-task-label" style={{marginTop:'2px'}}> ( ${acceptedTask.totalAmount} )</span>
              </p>
              <p>
                <span className="apply-task-label">Job description:</span> {acceptedTask.taskDescription}
              </p>
              <p>
                <span className="apply-task-label">Offer description:</span> {acceptedTask.offerDescription}
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
              <p className='accepted-freelancer-name'>
                <span className="apply-task-label">Freelancer Name:</span>{acceptedTask.freelancerFullName}
              </p>
            </div>
            <div className="apply-task-actions ">
              {acceptedTask.isContract === false ? (
                <button className="contract-button" onClick={()=>{navigateToContract(acceptedTask.freelancerId, acceptedTask.jobPostId)}} >Create contract</button>
              ) : (
                null
              )}
              <Link className="chat-button" onClick={()=>{openChatModal(acceptedTask.clientId, acceptedTask.freelancerId, acceptedTask.freelancerFullName)}}>Chat</Link>
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
  <ChatModal isOpen={modalOpen} closeModal={closeChatModal} userId={userId} recipientId={recipientId} recipient={recipient} token={token} />
  <ToastContainer position="top-center" />
</div>
  )
}

export default ClientAcceptFree;