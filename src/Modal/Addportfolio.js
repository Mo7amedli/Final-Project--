import React, { useState } from 'react'

export default function Addportfolio({ isOpen, closeModal, saveData }) {
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [CompletionDate, setCompletionDate] = useState('');
    const [ProjectImage, setProjectImage] = useState(null);
    const handleImageChange = (event) => {
        setProjectImage(event.target.files[0]);
    };

  return (
    <div>
        <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal Title</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <input type="text" className="form-control" id="lastName" value={Title} placeholder='Title of project' onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="mb-2">
                <input type="number" className="form-control" id="age" value={Description} placeholder='Description about project' onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" id="phone" value={CompletionDate} placeholder='Completion Date' onChange={(e) => setCompletionDate(e.target.value)} />
              </div>
              <div>
              <input className='form-control' type="file" accept="image/*" name='pictureUrl' onChange={handleImageChange} placeholder="Url of your picture"/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" >Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
