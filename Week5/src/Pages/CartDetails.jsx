import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { FiTrash2 } from 'react-icons/fi';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

const CartDetails = ({ item }) => {
  const { removeFromCart, decreaseAmount, increaseAmount } = useContext(ShopContext);
  const { id, title, image, price, amount } = item;

  return (
    <div className='flex justify-between items-center mt-5 border-b pb-3'>
      
      <div className='flex items-center space-x-4'>
        <img src={image} alt={title || 'Product Image'} className='w-16 h-16' />
        <div>
          <h3 className='font-medium'>{title}</h3>
          <div className='text-red-500 text-sm cursor-pointer flex items-center' onClick={() => removeFromCart(id)}>
            <FiTrash2 className='mr-1' />
            <span>Remove</span>
          </div>
        </div>
      </div>


      <div className='text-gray-700'>
        ${price.toFixed(2)}
      </div>

      <div className='text-gray-700 font-medium'>
        ${(price * amount).toFixed(2)}
      </div>
    </div>
  );
};

export default CartDetails;
