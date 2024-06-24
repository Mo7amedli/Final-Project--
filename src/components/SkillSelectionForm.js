import React, { useState } from 'react';

const SkillSelectionForm = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillChange = (index, value) => {
    const newSkills = [...selectedSkills];
    newSkills[index] = value;
    setSelectedSkills(newSkills);
  };

  const addSkill = () => {
    setSelectedSkills([...selectedSkills, '']);
  };

  const removeSkill = (index) => {
    const newSkills = selectedSkills.filter((_, i) => i !== index);
    setSelectedSkills(newSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append each skill to FormData
    selectedSkills.forEach((skill, index) => {
      formData.append('selectedSkills', skill); 
    });

    try {
      const response = await fetch('/your-api-endpoint', {
        method: 'POST',
        body: formData, // Send FormData
      });

      if (response.ok) {
        console.log('Skills sent successfully!');
        // Handle success, e.g., display a message or redirect
      } else {
        console.error('Error sending skills:', response.status);
        // Handle error, e.g., display an error message
      }
    } catch (error) {
      console.error('Error sending skills:', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div style={{ minHeight: '90vh' }} className="container">
        <form onSubmit={handleSubmit} className="form">
            {selectedSkills.map((skill, index) => (
            <div key={index} className="form-group">
                <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="form-control"
                />
                <button type="button" onClick={() => removeSkill(index)} className="btn btn-danger btn-sm">
                -
                </button>
            </div>
            ))}
            <button type="button" onClick={addSkill} className="btn btn-primary btn-sm m-2">
            Add integer item
            </button>
            <button type="submit" className="btn btn-success btn-sm">
            Submit
            </button>
        </form>
    </div>
  );
};

export default SkillSelectionForm;