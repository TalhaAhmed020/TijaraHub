// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    selectedProduct: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newProduct = action.payload;

            const existingItem = state.cartItems.find(
                item => item.id === newProduct.id
            );

            if (existingItem) {
                existingItem.quantity += newProduct.quantity;
            } else {
                state.cartItems.push(newProduct);
            }
            console.log(state.cartItems, 'cart items after addition');
        },
        updateQuantity: (state, action) => {
            const { id, type } = action.payload;
            const item = state.cartItems.find((i) => i.id === id);
            if (item) {
                if (type === "increment") item.quantity += 1;
                if (type === "decrement" && item.quantity > 1) item.quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        },
         clearCart: (state) => {
            state.cartItems = [];
        },
        setProduct(state, action) {
      state.selectedProduct = action.payload;
    },

    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, setProduct } = productSlice.actions;

export const selectCartItems = (state) => state.product.cartItems;

// ⭐ Export reducer
export default productSlice.reducer;
