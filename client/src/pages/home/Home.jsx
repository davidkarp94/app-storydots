import React, { useEffect, useState } from 'react';
import './home.css';
import Product from '../../components/product/Product';
import FormNewProduct from '../../components/form/FormNewProduct';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',

  })
  const [listUpdated, setListUpdated] = useState(false);
  const [modalNewProduct, setModalNewProduct] = useState(false);
  const isLoggedIn = localStorage.getItem('isAdmin');

  const closeModal = () => {
    setModalNewProduct(false);
  }

  const handleList = (e) => {
    setListUpdated(e);
  }

  useEffect(() => {
    const getProducts = async() => {
      try {
        const response = await fetch('https://storydots-app-server.onrender.com/products', {
          method: 'GET'
        });
        const data = await response.json();
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }

    getProducts();
    setListUpdated(false);
  }, [listUpdated]);

  return (
    <>

    {
      isLoggedIn && (
        <button className='main-btn' style={{marginBottom:'2rem'}} onClick={() => modalNewProduct ? setModalNewProduct(false) : setModalNewProduct(true)}>Add New Product</button>
      )
    }

    {
      modalNewProduct && (
        <div className="overlay">
          <FormNewProduct closeModal={closeModal} updateList={handleList} />
        </div>
      )
    }

    <div className='product-list'>
      {
        products?.data?.map(({id, name, description, image_url, price}) => {
          return (
              <Product
              key={id}
              id={id}
              name={name}
              description={description}
              image_url={image_url}
              price={price}
              handleList={handleList}
              />
          )
        })
      }
    </div>
    </>
  )
}

export default Home