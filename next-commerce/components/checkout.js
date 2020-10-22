/** @format */

import React, { useContext, useState, useCallback, useEffect } from "react";
import CartItem from "./cartItem";
import Cart, { CartContext } from "../contexts/Cart";
import useLipaNaMpesa from "../hooks/useLipaNaMpesa";
import Input from "./Input";
import fetchJson from "../utils/fetchJson";

function checkout() {
  const cartContext = useContext(CartContext);
  const { show, toggleShow, cartItems, cartTotal } = cartContext;

  const { requestToken, success, loading, defaultSuccess } = useLipaNaMpesa();
  const [phone, setPhone] = useState(254);
  const [showForm, setShowForm] = useState(false);

  const changeHandler = (e) => {
    setPhone(e.target.value);
  };
  const toggleForm = useCallback(() => {
    setShowForm(!showForm);
  });

  const [storeAmount, setStoreAmount] = useState({});

  const updateStoreAmount = ({ id, amount }) => {
    setStoreAmount({ ...storeAmount, [id]: amount });
  };

  return (
    <div
      className={`z-20 fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 ${show} ? 'translate-x-0 ease-out : 'translate-x-full ease-in' `}>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-medium text-gray-700'>Your cart</h3>
        <button
          onClick={toggleShow}
          className='text-gray-600 focus:outline-none'>
          <svg
            className='h-5 w-5'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        </button>
      </div>
      <hr className='my-3' />
      {loading && (
        <p className='text-gray-600 bg-gray-100 rounded p-2 '>
          loading transaction...
        </p>
      )}
      {success !== null && (
        <div className='mb-3'>
          <p
            onClick={defaultSuccess}
            className='text-white  font-semi-bold text-xl mt-1 h-8 w-6 rounded-full full text-center cursor-pointer float-right'>
            x
          </p>

          <p
            className={`text-white py-2 rounded px-6 ${
              success ? "bg-green-400" : "bg-red-400"
            }`}>
            {success
              ? "Transaction completed successfully"
              : "Incomplete Transaction"}
          </p>
        </div>
      )}

      <p className='text-center text-blue-600'>Cart Total {cartTotal} </p>

      {cartItems.map((item) => (
        <CartItem key={item?._id} product={item} setStore={updateStoreAmount} />
      ))}
      {!showForm && (
        <a
          onClick={toggleForm}
          className='flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
          <span>Checkout</span>
          <svg
            className='h-5 w-5 mx-2'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
          </svg>
        </a>
      )}
      <div>
        {showForm && (
          <form
            onSubmit={requestToken(cartTotal, phone)}
            className='p-3 mt-4 rounded shadow-lg'>
            <p
              className='cursor-pointer text-xl text-gray-800'
              onClick={toggleForm}>
              x
            </p>
            <Input
              type='number'
              changeHandler={changeHandler}
              value={phone}
              placeholder='Mpesa Phone Number'
            />
            <button
              type='submit'
              className='text-white p-2 w-full bg-green-600 rounded shadow mt-4'>
              Lipa na Mpesa
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default checkout;
