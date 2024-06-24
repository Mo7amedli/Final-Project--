import React, { useEffect, useState } from 'react';
import './Edit.css'; // Import the CSS file for styling
import axios from 'axios';
import { baseUrl } from '../Api/Api';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const LanguageList = () => {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  //fetch languages
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Language/Get-All-Language-With-Id-For-Admin`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLanguages(response.data)
      console.log(response.data);
      
    } catch (error) {
      const errorPages = error.response.status;
        if (errorPages === 403) {
          navigate('/error403');
        } else if (errorPages === 401) {
          navigate('/error401');
        } else if (errorPages === 500) {
          navigate('/error500');
        } else{
          console.log(error.response)
        }
    }
  };

  const [addLanguage, setAddLanguage] = useState();
  const [addID, setAddID] = useState();
  //handle adding language
  const handleAddLanguage = async() => {
    try{
      const response = await axios.post(`${baseUrl}/api/Language/Add-New-Language`, { id: addID, value: addLanguage }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(`${addLanguage} Language added successfully!`);
      setAddLanguage("");
      setAddID("");
      fetchData();
    }catch(error){
      console.log(error)
    }
  }

  const [editingLanguageId, setEditingLanguageId] = useState(null);
  const [editedLanguageName, setEditedLanguageName] = useState('');
  //open edit language modal handler
  const handleEditLanguage = (id, name) => {
    setEditingLanguageId(id);
    setEditedLanguageName(name);
  };
  // cancel edit language modal handler
  const handleCancelEdit = () => {
    setEditingLanguageId(null);
    setEditedLanguageName('');
  };

  //handle updated language
  const handleSaveUpdateLanguage = async (name, id) => {
    try {
      const response = await axios.put(`${baseUrl}/api/Language/Edit-Language?id=${id}`,{value:editedLanguageName}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(`"${name}" Language has been updating successfully`)
      fetchData();
      setEditingLanguageId(null);
      } catch (error) {
        console.error(error);
      }
  };

  //handle delete skill
  const handleDeleteLanguage = async (name, id) => {
    try {
      const response = await axios.put(`${baseUrl}/api/Language/Delete-Language?id=${id}`,id,  {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      console.log(response);
      toast.success(`"${name}" Language has been Deleting successful`)
      fetchData();
    } catch (error) {
      console.error(error.response.data);
      if(error.response.data === 'Language Is Deleted.'){
        toast.error("This Language is already deleted.")
      }
    } 
  };

  //handle return deleted language
  const handleReturnLanguage = async (name, id) => {
    try {
      const response = await axios.put(`${baseUrl}/api/Language/Return-Delete-Language?id=${id}`, id,{
        headers: {
          Authorization: `Bearer ${token}`
        }
        });
      console.log(response);
      toast.success(`"${name}" Language has been returning successfully`)
      fetchData();
    } catch (error) {
      console.log(error.response.data);
      if(error.response.data === 'Language Is Exist.')
      toast.error("This Language is already exists")
    }
  };

  return (
    <div className="languages-list-container">
      <h2 className="languages-list-heading mt-2">Languages List</h2>
      <div className=" d-flex justify-content-center my-2">
          <div>
            <input className="form-control" type="text" placeholder="Enter Language" onChange={(e) => setAddLanguage(e.target.value)}/>
          </div>
          <div>
            <input className="form-control mx-1" type="text" placeholder="Enter Id" onChange={(e) => setAddID(e.target.value)}/>
          </div>
          <div>
            <button className="btn btn-success mx-2" type="button" onClick={handleAddLanguage}>Add</button>
          </div> 
        </div>
      <table className="languages-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Language Name</th>
            <th>ID</th>
            <th>Is Deleted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language, index) => (
            <tr key={language.id}>
              <td>{index + 1}</td>
              <td style={{maxWidth:'250px'}}>
                {editingLanguageId === language.id ? (
                  <input className='form-control'
                    type="text"
                    value={editedLanguageName}
                    onChange={(e) => setEditedLanguageName(e.target.value)}
                  />
                ) : (
                  language.value
                )}
              </td>
              <td style={{maxWidth:'70px'}}>
                {language.id}
              </td>
              <td>{language.isDeleted.toString()}</td>
              <td>
                {editingLanguageId === language.id ? (
                  <>
                    <button className="save-button" onClick={() => handleSaveUpdateLanguage(language.value, language.id)}>Save</button>
                    <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="edit-button" onClick={() => handleEditLanguage(language.id, language.value)}>Edit</button>
                  </>
                )}
                <button onClick={() => handleDeleteLanguage(language.value, language.id)} className='delete-button'>Delete</button>
                <button onClick={() => handleReturnLanguage(language.value, language.id)} className='return-button'>Restore</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default LanguageList;
