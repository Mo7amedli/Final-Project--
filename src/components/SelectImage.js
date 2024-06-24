import React, { useState } from 'react'

export default function SelectImage() {
    const [selectedImage, setSelectedImage] = useState(null);


    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    };

  return (
    <div>
        <img src={selectedImage} alt="Selected" />
      <label htmlFor="imageInput" className="select-photo-label">
        Select Photo
      </label>
      <input
        type="file"
        accept="image/*"
        id="imageInput"
        className="image-input"
        onChange={handleImageChange}
      />
    </div>
  )
}
