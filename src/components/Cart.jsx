import { useState, useEffect } from "react";
import Product from "./Product";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts/2");
      const data = await response.json();
      setCartItem(data.products); // Directly setting the products array
    } catch (error) {
      console.error("Error fetching the cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <h1>Products Cart</h1>
      {cartItem.map((product) => (
        <div key={product.productId}>
          <Product productId={product.productId} />
        </div>
      ))}
    </div>
  );
};

export default Cart;
