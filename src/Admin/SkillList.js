import React, { useEffect, useState } from 'react';
import './Edit.css'; 
import axios from 'axios';
import { baseUrl } from '../Api/Api';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const SkillsList = () => {
  const navigate = useNavigate()
  const [skills, setSkills] = useState([]);

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  //fetch skills
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Skill/Get-All-SKills-With-Id-For-Admin`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSkills(response.data)
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

  const [addSkill, setAddSkill] = useState();
  //handle adding skill
  const handleAddSkill = async() => {
    try{
      const response = await axios.post(`${baseUrl}/api/Skill/Add-New-Skill`, {name: addSkill}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(`${addSkill} Category added successfully!`);
      setAddSkill("");
      fetchData();
    }catch(error){
      console.log(error)
    }
  }

  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editedSkillName, setEditedSkillName] = useState('');
  // open edit skill modal handler
  const handleEditSkill = (id, name) => {
    setEditingSkillId(id);
    setEditedSkillName(name);
  };
  // cancel edit skill modal handler
  const handleCancelEdit = () => {
    setEditingSkillId(null);
    setEditedSkillName('');
  };

  //handle updating Skill
  const handleSaveUpadteSkill = async(name, id) => {
    try {
      const response = await axios.put(`${baseUrl}/api/Skill/Edit-Skill?id=${id}`,{name:editedSkillName}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(`"${name}" Skill has been updating successfully`)
      fetchData();
      setEditingSkillId(null);
      } catch (error) {
        console.error(error);
      }
  };

  //handle delete skill
  const handleDeleteSkill = async (name, id) => {
    try {
      const response = await axios.put(`${baseUrl}/api/Skill/Delete-Skill?id=${id}`,id,  {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      console.log(response);
      toast.success(`${name} Skill has been Deleting successful`)
      fetchData();
    } catch (error) {
      console.error(error.response.data);
      if(error.response.data === 'Is Already Deleted'){
        toast.error("This skill is already deleted")
      }
    } 
  };

  //handle return deleted category
  const handleReturnSkill = async(name, id)=>{
    try {
      const response = await axios.put(`${baseUrl}/api/Skill/Return-Delete-Skill?id=${id}`, id,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      toast.success(`"${name}" Skill has been returning successfully`)
      fetchData();
      } catch (error) {
        console.log(error.response.data);
        if(error.response.data === 'Is Already Exist')
        toast.error("This Skill is already exists")
      }
  }

  return (
    
      <div className="skills-list-container">
        <h2 className="skills-list-heading mt-2">Skills List</h2>
        <div className=" d-flex justify-content-center my-2">
          <div>
            <input className="form-control" type="text" placeholder="Enter Skill" onChange={(e) => setAddSkill(e.target.value)} />
          </div>
          <div>
            <button className="btn btn-success mx-2" type="button" onClick={handleAddSkill}>Add</button>
          </div> 
        </div>
        <table className="skills-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Skill Name</th>
              <th>Isdeleted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => (
              <tr key={skill.id}>
                <td>{skill.id}</td>
                <td style={{maxWidth:'250px'}}>
                  {editingSkillId === skill.id ? (
                    <input className='form-control' 
                      type="text"
                      value={editedSkillName}
                      onChange={(e) => setEditedSkillName(e.target.value)}
                    />
                  ) : (
                    skill.name
                  )}
                </td>
                <td>{skill.isDeleted.toString()}</td>
                <td>
                  {editingSkillId === skill.id ? (
                    <>
                      <button className="save-button" onClick={() => handleSaveUpadteSkill(skill.name, skill.id)}>Save</button>
                      <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                    
                    </>
                  ) : (
                    <button className="edit-button" onClick={() => handleEditSkill(skill.id, skill.name)}>Edit</button>
                    
                  )}
                  <button onClick={() => handleDeleteSkill(skill.name, skill.id)} className='delete-button'>Delete</button>
                  <button onClick={() => handleReturnSkill(skill.name, skill.id)} className='return-button'>Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    
  );
};

export default SkillsList;
