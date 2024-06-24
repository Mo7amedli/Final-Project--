import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Api/Api';
import axios from 'axios';
function UpdateContract({ isOpen, closeModal, contract, JopPostId, FreelancerId , token, fetchContracts }) {
  const [Price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [TremsAndCondetions, setTremsAndCondetions] = useState('');

  useEffect(() => {
    if (contract) {
      setPrice(contract.price);
      setTremsAndCondetions(contract.tremsAndCondetions);
      const startDateIso = contract.startDate;
      const startDate = startDateIso.substring(0, 10); // extract date part only (YYYY-MM-DD)
      setStartDate(startDate);
      const endDateIso = contract.endDate;
      const endDate = endDateIso.substring(0, 10); // extract date part only (YYYY-MM-DD)
      setEndDate(endDate);
    }
  }, [contract]);

    const handleUpdate = async()=>{
      const StartDate= new Date(startDate).toISOString()
      const EndDate = new Date(endDate).toISOString()
      try{
        await axios.put(`${baseUrl}/api/Contract/UpdateContract`, {
          TremsAndCondetions, Price, StartDate, EndDate, JopPostId, FreelancerId
        }  ,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        fetchContracts();
        closeModal();
      }catch(error){
        console.log(error);
      }
    }

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
    <div className="modal-dialog" style={{ minWidth: '700px', marginLeft: '440px' }}>
      <div className="modal-content" style={{ marginLeft: '80px', marginTop: '100px' }}>
        <div className="modal-header">
          <h5 className="modal-title">Update Contract</h5>
          <button type="button" className="btn-close" onClick={() => {
              closeModal();
              }}>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className='form-label' htmlFor="price">Price:</label>
            <input
              type="number"
              className='form-control'
              id="price"
              name="price"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          
          <div className="row"> 
          <div className='form-group col-6'>
          <label className='form-label' htmlFor="startDate">Start Date:</label>
          <input
              type="date"
              className='form-control me-2' 
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
          />
          </div>
            <div className='form-group col-6'>
                <label className='form-label' htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    className='form-control me-2' 
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
          </div>
          <div className="form-group">
            <label className='form-label' htmlFor="termsAndConditions">Terms & Conditions:</label>
            <textarea
              className='form-control'
              id="termsAndConditions"
              name="termsAndConditions"
              value={TremsAndCondetions}
              onChange={(e) => setTremsAndCondetions(e.target.value)}
            />
          </div>

        </div>
        <div className="modal-footer">
          <button type="button" className='btn btn-secondary' onClick={() => {
                closeModal();
                }}>Close</button>
          <button type="button" className='btn btn-primary' onClick={handleUpdate}>Save</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateContract;