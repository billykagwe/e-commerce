/** @format */

import React, { useContext, useState, useCallback } from "react";
import { CartContext } from "../contexts/Cart";

function CartItems({ product, setStore }) {
  const cartContext = useContext(CartContext);
  const { image, name, price } = product;
  const { removeFromCart, updateCart } = cartContext;
  const [count, setCount] = useState(1);
  const total = parseInt(price) * count;

  const decreaseCount = () => {
    const shouldAdd = count - 1 > 0;
    if (shouldAdd) {
      updateCart(product, -product.price);
      setCount(count - 1);
    } else {
      setCount(1);
    }
  };

  const increaseCount = useCallback(() => {
    updateCart(product, +product.price);
    setCount(count + 1);
  });

  return (
    <div className='flex justify-between mt-6'>
      <div className='flex'>
        <img className='h-20 w-20 object-cover rounded' src={image} alt='' />
        <div className='mx-3'>
          <h3 className='text-sm text-gray-600'>{name}</h3>
          <div className='flex items-center mt-2'>
            <button
              onClick={increaseCount}
              className='text-gray-500 focus:outline-none focus:text-gray-600'>
              <svg
                className='h-5 w-5'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'></path>
              </svg>
            </button>
            <span className='text-gray-700 mx-2'>{count}</span>
            <button
              onClick={decreaseCount}
              className='text-gray-500 focus:outline-none focus:text-gray-600'>
              <svg
                className='h-5 w-5'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'></path>
              </svg>
            </button>
            <p
              onClick={removeFromCart(product._id, total)}
              className='text-lg text-gray-600 cursor-pointer ml-24'>
              x
            </p>
          </div>
        </div>
      </div>
      <span className='text-gray-600 h-6'>{total}</span>
    </div>
  );
}

export default CartItems;
