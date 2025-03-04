import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { BiCartAdd } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Product = () => {
  const { filteredProducts, addToCart } = useContext(ShopContext);

  return (
    <div>
      <div className='mt-10'>
        <h1 className='text-center text-4xl font-bold'>Products</h1>
      </div>
      <div className='grid grid-cols-3 gap-30 p-10'>
        {filteredProducts.map((product) => {
          const { id, image, title, price } = product;
          return (
            <div
              key={id}
              className='relative overflow-hidden border border-gray-300 p-4 text-center transition-shadow hover:shadow-lg'
            >
              <div className='relative'>
                <img
                  src={image}
                  alt={title}
                  className='w-full h-64 transform scale-90 transition-transform duration-300 hover:scale-100'
                />
                <div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-3 opacity-0 transition-opacity duration-300 hover:opacity-100'>
                  <button
                    onClick={() => addToCart(product, id)}
                    className='bg-[#6f02b8] text-white p-4 rounded-full transition-colors duration-300 flex items-center hover:bg-[#362542]'
                  >
                    <BiCartAdd className='text-2xl' />
                  </button>
                </div>
              </div>
              <div className='mt-4'>
                <h3 className='text-lg font-bold'>{title}</h3>
                <p className='text-[#6f02b8] text-2xl font-semibold'>${price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
