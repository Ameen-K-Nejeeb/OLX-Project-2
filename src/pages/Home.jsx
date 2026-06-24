import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { useNavigate } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  console.log(items);
  
  const filteredItems = items.filter((product) => 
    product.title?.toLowerCase().includes(search.toLowerCase()) ||
    product.category?.toLowerCase().includes(search.toLowerCase()) ||
    product.location?.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <div className="market-header">
        <div className="heading">
          <p className="eyebrow">FRESH LISTINGS</p>

          <h1>Buy and sell nearby</h1>

          <p className="description">
            Find used phones, furniture, vehicles,
            electronics, and more.
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            value={search}
            placeholder="Search title, category, or location..."
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {/* <button className="search-btn">
            Search
          </button> */}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <h2>No listing found</h2>
          <h4>
            Try another search or create the first listing.
          </h4>
        </div>
      ) : (
        <div className="product-grid">
          {filteredItems.map((product) => (
            <div
              key={product.id}
              className="product-card"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="product-image"
                onClick={() => navigate(`/productview/${product.id}`)}
              />

              <div className="product-info">
                <h3>
                  ₹ {product.price?.toLocaleString("en-IN")}
                </h3>

                <h4>{product.title}</h4>

                <p>{product.location}</p>

                <small>
                  {product.category}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;