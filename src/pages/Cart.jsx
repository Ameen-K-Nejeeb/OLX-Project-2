import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the cart?"
    );

    if (confirmClear) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to continue shopping.</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="cart-image"
              />

              <div className="cart-details">
                <h3>{item.title}</h3>

                <div className="cart-price">
                  ₹ {item.price?.toLocaleString("en-IN")}
                </div>

                <p className="cart-location">
                  {item.location}
                </p>

                <div className="quantity-section">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item.id)
                      )
                    }
                  >
                    -
                  </button>

                  <span className="quantity-value">
                    {item.quantity}
                  </span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(
                      removeFromCart(item.id)
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2 className="cart-total">
              Total:
              <span className="total-price">
                ₹ {total.toLocaleString("en-IN")}
              </span>
            </h2>

            <div className="cart-actions">
              <button
                className="clear-cart-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>

              <button
                className="checkout-btn"
                onClick={() =>
                  alert("Checkout Coming Soon")
                }
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;