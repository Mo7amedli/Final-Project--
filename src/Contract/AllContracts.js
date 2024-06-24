import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'cookie-universal'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Api/Api';
import UpdateContract from './UpdateContract';
import moment from 'moment';
function AllContracts() {
    const [contracts, setContracts] = useState([]);
    const [noContracts, setNocontracts] = useState('')
    const navigate = useNavigate();
    const cookies = Cookie();
    const token = cookies.get('freelanceCookie')
    useEffect(() => {
      fetchContracts();
    }, []);

    const fetchContracts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/Contract/Get-My-All-Contracts-User-Freelancer`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        setContracts(response.data.sort((a, b) => b.contractID - a.contractID));
      } catch (error) {
          const errorPages = error.response.status;
          if (errorPages === 403) {
            navigate('/error403');
          } else if (errorPages === 401) {
            navigate('/error401');
          } else if (errorPages === 500) {
            navigate('/error500');
          }
          else if(error.response.data === "No Contract To Show"){
              setNocontracts("Looks like there are no contracts to display yet. Create a new contract to get started.")
          }
        }
    };
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`${baseUrl}/api/Contract/CancelContract?id=${id}`, { id }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const response = await axios.get(`${baseUrl}/api/Contract/Get-My-All-Contracts-User-Freelancer`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const newContracts = response.data.sort((a, b) => b.contractID - a.contractID);
        setContracts(newContracts);
        if (newContracts.length === 0) {
          setNocontracts("Looks like there are no contracts to display yet. Create a new contract to get started.");
        }
      } catch (error) {
        console.log(error.response);
      }
    };
  
    const [jobId, setJobid] = useState();
    const [FreelancerId, setFreelancerId] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
      setModalOpen(false);
    };


    const [Contract, setContract] = useState();
    const fetcContract = async (id, jopPostId, freelancerId) => {
      try {
        const response = await axios.get(`${baseUrl}/api/Contract/findByJobPostId?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setModalOpen(true);
        setJobid(jopPostId);
        setFreelancerId(freelancerId);
        setContract(response.data);
        
        } catch (error) {
            console.log(error.response);
        }
      };

    return (
      <div className="contract-page-container">
        <div className="contract-page-header">
          <h1>All Contracts</h1>
        </div>
        {contracts.length > 0 ? (
          contracts.map((contract) => (
            <div className="contract-details-container" key={contract.id}>
              <div className="name-container">
                <div className="client-name-container">
                  <h3>Client Name: </h3>
                  <p>{contract.clinetName}</p>
                </div>
                <div className="freelancer-name-container">
                  <h3>Freelancer Name: </h3>
                  <p>{contract.freelancerName}</p>
                </div>
              </div>
              <div className="date-container">
                <div className="start-date-container">
                  <h3>Start Date: </h3>
                  <p>{moment(contract.startDate).format('DD-MM-YYYY')}</p>
                </div>
                <div className="end-date-container">
                  <h3>End Date: </h3>
                  <p>{moment(contract.endDate).format('DD-MM-YYYY')}</p>
                </div>
              </div>
              <div className="price-container">
                <h3>Price</h3>
                <p>${contract.price}</p>
              </div>
              <div className="job-description-container">
                <h3>Job Description: </h3>
                <p>{contract.jopPostDescription}</p>
              </div>
              <div className="terms-container">
                <h3>Terms and Conditions:</h3>
                <p>{contract.tremsAndCondetions}</p>
              </div>
              <div className="contract-actions">
                <button className="update" onClick={() => fetcContract(contract.jopPostId, contract.jopPostId, contract.freelancerId)
                }>
                  Update
                </button>
                <button className="delete" onClick={() => handleDelete(contract.contractID)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-contracts">
            <h2>{noContracts}</h2>
          </div>
        )}
        <UpdateContract isOpen={modalOpen} closeModal={closeModal} contract={Contract} JopPostId={jobId} FreelancerId={FreelancerId} token={token} fetchContracts={fetchContracts} />
      </div>
    )
}

export default AllContracts;