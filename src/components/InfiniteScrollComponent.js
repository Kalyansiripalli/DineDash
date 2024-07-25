import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios"; // Assuming you are using axios for API calls

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1); // To keep track of pagination
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // Function to fetch data from API
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.example.com/items?page=${page}` // Replace with your API endpoint
      );
      setItems((prevItems) => [...prevItems, ...response.data.items]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Set up the IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchItems();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchItems, loading]);

  return (
    <div className="container">
      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item">
            {/* Render your item here */}
            {item.name}
          </div>
        ))}
      </div>
      <div ref={loaderRef} className="loader">
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default InfiniteScrollComponent;
