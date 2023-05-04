import React, { useState } from 'react';
import './formnewproduct.css';
import { GrFormClose } from 'react-icons/gr';
import Dropzone from 'react-dropzone';

const FormNewProduct = ({ closeModal, updateList }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (file) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("image_url", image.name);
      
      const response = await fetch("https://storydots-app-server.onrender.com/products", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log(data.message);
  
      setName('');
      setDescription('');
      setImageUrl('');
      setPrice('');
      updateList(true);
  
      closeModal();
    } catch (error) {
      console.error(error.message); 
    }
  };

  return (
    <div className='form-container'>
      <div className='form-title-container'>
        <h2>Add New Product</h2>
        <GrFormClose className='close-form' onClick={() => closeModal()} />
      </div>

      <form onSubmit={handleSubmit} className='newproduct-form'>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <textarea
            type='text'
            id='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => handleImageChange(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!previewUrl ? (
                <button className='main-btn'>Add Image Here</button>
              ) : (
                  <img src={previewUrl} className='preview-img' alt='' />
              )}
            </div>
          )}
        </Dropzone>

        <div className='form-group'>
          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            id='price'
            value={price}
            min={1}
            pattern='\d*'
            onKeyPress={(event) => {
              if (event.key === '-' || event.key === '+' || event.key === 'e') {
                event.preventDefault();
              }
            }}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <div className='form-actions'>
          <button type='submit' className='main-btn'>Add</button>
          <button type='button' className='main-btn black-btn' onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNewProduct;