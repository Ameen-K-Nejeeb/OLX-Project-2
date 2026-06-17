import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Sell = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector((state) => state.auth.user);

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Mobiles");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const product = docSnap.data();

          setTitle(product.title || "");
          setDescription(product.description || "");
          setPrice(product.price || "");
          setLocation(product.location || "");
          setCategory(product.category || "Mobiles");
          setImageUrl(product.imageUrl || "");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please Login");
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await updateDoc(
          doc(db, "products", id),
          {
            title,
            description,
            price: Number(price),
            location,
            category,
            imageUrl,
          }
        );

        alert("Product Updated Successfully");
      } else {
        await addDoc(collection(db, "products"), {
          title,
          description,
          price: Number(price),
          location,
          category,
          imageUrl,

          sellerUid: user.uid,
          sellerEmail: user.email,

          createdAt: new Date().toISOString(),
        });

        alert("Product Published Successfully");
      }

      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sell-container">
      <div className="sell-card">

        <h2>
          {isEditMode
            ? "Update Product"
            : "Post a Product"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            required
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="Mobiles">
              Mobiles
            </option>

            <option value="Vehicles">
              Vehicles
            </option>

            <option value="Property">
              Property
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Furniture">
              Furniture
            </option>

            <option value="Fashion">
              Fashion
            </option>
          </select>

          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Product"
              : "Publish Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Sell;