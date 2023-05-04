import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';

const FormEditProduct = ({ closeModal, id, name: initialName, description: initialDescription, image_url, price: initialPrice, updateList }) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [price, setPrice] = useState(initialPrice);

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://storydots-app-server.onrender.com/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          image_url,
          price,
        }),
      });

      const data = await response.json();
      console.log(data.message); // show success message

      // update the list of products
      updateList();

      // close modal
      closeModal();
    } catch (error) {
      console.error(error.message); // show error message
    }
  };

  return (
    <div className='form-container'>
      <div className='form-title-container'>
        <h2>Edit Product</h2>
        <GrFormClose className='close-form' onClick={() => closeModal()} />
      </div>

      <form onSubmit={handleEdit} className='edit-form'>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
            id='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            type='text'
            id='price'
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <div className='form-actions'>
          <button type='submit' className='main-btn'>Update</button>
          <button type='button' className='main-btn black-btn' onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditProduct;