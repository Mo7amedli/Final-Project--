import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import { baseUrl } from '../../Api/Api';
import Cookie from 'cookie-universal';
function EditLandSkill() {

    const [AddedLanguages, setAddedLanguages] = useState([])
    const [AddedSkills, setAddedSkills] = useState([])

    const [languageOptions, setLanguageOptions] = useState();
    //fetch skills
    useEffect(() => {
        fetchLanguages();
        fetchSkills();
    }, []);
  
    const fetchLanguages = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/Language/Get-All-Language-With-Id`);
            console.log(response.data);
            setLanguageOptions(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleLanguageChange = (languageOptions) => {
        const selectedLanguageID = languageOptions.map((option) => option.id);
        setAddedLanguages(selectedLanguageID);
    };
    

    const [skillOptions, setSkillOptions] = useState();
    //fetch skills
    const fetchSkills = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Skill/Get-All-SKills-With-Id`);
      console.log(response.data);
      setSkillOptions(response.data)
      
    } catch (error) {
      console.error(error);
    }
  };
  const handleLSkillChange = (skillOptions) => {
    const selectedSkillID = skillOptions.map((option) => option.id);
    setAddedSkills(selectedSkillID);
  };

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');
  const handleSubmit= async ()=> {
    const formData = new FormData();
    AddedSkills.forEach((skill, index) => {
        formData.append('SelectedSkills', skill); 
      });
    AddedLanguages.forEach((skill, index) => {
        formData.append('SelectedLanguages', skill); 
      });
    
    console.log(AddedLanguages)
    console.log(AddedSkills)
}
  const value1 = [{id:1, name:'skill1'}, {id:2, name:'skill2'}]
  const value2 = [{id:'lan1', value:'lang1'}, {id:'lan2', value:'lang2'}]
    return (
        <div class="container mt-5">
        <Select 
            placeholder='Add Skills'
            options={skillOptions}
            labelField="name"
            valueField="name"
            multi
            onChange={handleLSkillChange}
            color='#65B741'
            values={value1}
            />
          <Select 
              placeholder='Add Languages'
              options={languageOptions}
              labelField="value"
              valueField="value"
              multi
              onChange={handleLanguageChange}
              color='#65B741'
              values={value2}
          />
          
            <button className='btn btn-primary' onClick={handleSubmit}>ADD</button>
      </div>
    );
}

export default EditLandSkill