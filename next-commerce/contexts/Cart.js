import React, { createContext, useCallback,useState,useReducer } from 'react'
import useShow from '../hooks/useShow'

export const CartContext = createContext()

function Cart({children}) {
    const {show,toggleShow} = useShow()
    const [cartItems,setCartItems] = useState([])

    const initialState = {count:0,cartItems:[]};


    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                const isPresent = state.cartItems.length > 0 && state.cartItems.find(item => item._id === action.payload.product._id)
           
               return isPresent ? {...state,count: state.count + action.payload.amount} :{...state,cartItems: [...state.cartItems,action.payload.product],count: state.count + action.payload.amount || 0}
            case 'decrement':
                let updatedCart = state.cartItems.filter(item => item._id !== action.payload.id)
                return {...state,cartItems:updatedCart,count: state.count - action.payload.amount || 0}
            default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const isInCart = ({_id}) => state.cartItems.find(item => item._id === _id)
    

    const updateCart = (product,amount) =>{
        let parsedAmount = parseInt(amount || product.price)
        dispatch({type:'increment',payload:{amount: parsedAmount,product}})
    }
    
    const removeFromCart = (id,amount) => useCallback(() =>{
        dispatch({type:'decrement',payload:{id,amount}})
    })

    return (
        <CartContext.Provider value={{show,toggleShow,cartItems:state.cartItems,updateCart,isInCart,removeFromCart,cartTotal:state.count}}>
           {children} 
        </CartContext.Provider>
    )
}

export default Cart
