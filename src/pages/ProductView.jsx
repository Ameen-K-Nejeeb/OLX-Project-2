import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { addToCart } from "../slices/cartSlice";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));

      alert("Product deleted successfully");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleUpdate = () => {
    navigate(`/sell/${id}`);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const isOwner = user?.uid === product?.sellerUid;

  return (
    <div className="product-view-container">
      <div className="product-view-card">
        <div className="product-image-section">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="product-view-image"
          />
        </div>

        <div className="product-details-section">
          {isOwner && (
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <button
                className="product-category-update"
                onClick={() => navigate(`/edit-product/${id}`)}
              >
                Update
              </button>

              <button
                className="product-category-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}

          <span className="product-category">{product.category}</span>

          <h1>{product.title}</h1>

          <h2>₹ {product.price?.toLocaleString("en-IN")}</h2>

          <p className="product-description">{product.description}</p>

          <div className="product-meta">
            <div>
              <strong>Location</strong>
              <p>{product.location}</p>
            </div>

            <div>
              <strong>Posted On</strong>
              <p>{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <button className="contact-btn">Contact Seller</button>


          {user ? (<button onClick={() => {
            dispatch(addToCart(product));
            navigate("/cart");
          }} className="contact-btn" style={{marginTop:'10px'}}>Add To Cart</button>) : (<button onClick={() => {
            dispatch(addToCart(product));
            navigate("/login");
          }} className="contact-btn" style={{marginTop:'10px'}}>Add To Cart</button>)}

        </div>
      </div>
    </div>
  );
};

export default ProductView;
