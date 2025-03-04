import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import { productsData } from '../data';

const ProductDetails = () => {
  const { addToCart } = useContext(ShopContext);
  const { id } = useParams();

 
  const product = productsData.find((product) => product.id === parseInt(id, 10));

  
  if (!product) {
    return <p className="text-center text-red-500 text-xl mt-10">Product not found</p>;
  }

  return (
    <div className='flex p-20'>
      
      <div className='flex-shrink-0 mt-20'>
        <img src={product.image} alt={product.title} />
      </div>

      
      <div className='pl-16 mt-20'>
        <h3 className='text-3xl font-bold'>{product.title}</h3>
        <p className='text-2xl text-red-500 mt-3'>${product.price.toFixed(2)}</p>
        <p className='text-lg text-gray-600 mt-4'>{product.description}</p>

        
        <button
          className='mt-4 px-14 py-4 bg-[#6f02b8] text-white rounded hover:bg-purple-700'
          onClick={() => addToCart(product, parseInt(id, 10))}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
