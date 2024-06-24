import React, { useEffect, useState } from 'react';
import './Edit.css'; // Import the CSS file for styling
import axios from 'axios';
import { baseUrl } from '../Api/Api';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CategoriesList = () => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  

  //fetch categories
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Category/Get-All-Categories-With-Id-Admin`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(response.data)      
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

  const [addCategory, setAddCategory] = useState();
  //handle adding category
  const handleAddCategory = async() => {
    try{
      const response = await axios.post(`${baseUrl}/api/Category/Add-New-Category`, {name: addCategory}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(`${addCategory} Category added successfully!`);
      setAddCategory("");
      fetchData();
    }catch(error){
      console.log(error.response)
    }
  }

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
    // open edit category modal handler
  const handleEditCategory = (id, name) => {
    setEditingCategoryId(id);
    setEditedCategoryName(name);
  };
  // cancel edit category modal handler
  const handleCancelEdit = () => {
    setEditingCategoryId(null);
  };

  //handle updating category
  const handleSaveUpadteCategory = async(name, id) => {
    try {
      const response = await axios.put(`${baseUrl}/api/Category/Edit-Category?id=${id}`,{name:editedCategoryName}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(`updating "${name}" category has been successfully`)
      fetchData();
      setEditingCategoryId(null);
      } catch (error) {
        console.error(error);
      }
  };

  //handle delete category
  const handleDeleteCategory = async (name, id) => {
    try {
      const response = await axios.put(`${baseUrl}/api/Category/Delete-Category?id=${id}`, id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      toast.success(`Deleting "${name}" Category has been successfully`);
      fetchData();
    } catch (error) {
      console.error(error.response.data);
      if(error.response.data === 'Is Already deleted'){
        toast.error("This category is already deleted")
      }
    }
  };

  //handle return deleted category
  const handleReturnCategory = async(name, id)=>{
    try {
      const response = await axios.put(`${baseUrl}/api/Category/Return-Delete-Category?id=${id}`, id,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      toast.success(`Return "${name}" Category has been successfully`)
      fetchData();
      } catch (error) {
        console.log(error.response.data);
        if(error.response.data === 'Is Already Exit')
        toast.error("This category is already exist")
      }
  }

  return (
    <div className="categories-list-container">
      <h2 className="categories-list-heading mt-2">Categories List</h2>
      <div className=" d-flex justify-content-center my-2">
        <div>
          <input className="form-control" type="text" placeholder="Enter Category" onChange={(e) => setAddCategory(e.target.value)}/>
        </div>
        <div>
          <button className="btn btn-success mx-2" type="button" onClick={handleAddCategory}>Add</button>
        </div> 
      </div>
      <table className="categories-table">
        <thead>
          <tr>
            <th>ID</th>
            <th >category Name</th>
            <th>Isdeleted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td >
                {editingCategoryId === category.id ? (
                  <input className='form-control'
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>{category.isDeleted.toString()}</td>
              <td>
                {editingCategoryId === category.id ? (
                  <>
                    <button className="save-button" onClick={() => handleSaveUpadteCategory(category.name, category.id)}>Save</button>
                    <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button className="edit-button" onClick={() => handleEditCategory(category.id, category.name)}>Edit</button>
                  
                )}
                <button onClick={() => handleDeleteCategory(category.name, category.id)} className='delete-button'>Delete</button>
                <button onClick={() => handleReturnCategory(category.name, category.id)} className='return-button'>Return</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default CategoriesList;
