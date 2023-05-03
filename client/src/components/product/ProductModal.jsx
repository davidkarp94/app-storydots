import React from 'react'
import { GrFormClose } from 'react-icons/gr';

const ProductModal = ({ id, name, description, image_url, price, closeModal  }) => {
  return (
    <div className='overlay'>
        <div className='product-container modal-container'>

          <GrFormClose color='black' className='close-button' onClick={() => closeModal(false)} />

          <img className='product-image' src={image_url} alt="" />

          <h1 className='product-title'>{name}</h1>
          <p className='description'>{description}</p>
          <h2 className='product-price'>${price}</h2>

        </div>
    </div>
  )
}

export default ProductModal