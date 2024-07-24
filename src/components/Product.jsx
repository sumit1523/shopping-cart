import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Product = ({ productId }) => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      const data = await response.json();
      setProduct(data); // Directly setting the products array
    } catch (error) {
      console.error("Error fetching the cart:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <div>{product?.title}</div>
      <img
        src={product?.image}
        alt={product?.title}
        width={"200px"}
        height={"200px"}
      />
      <div>Price: {product?.price}</div>
    </div>
  );
};

export default Product;
