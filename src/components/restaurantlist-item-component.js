import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantService from "../services/restaurant.service";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/api/restaurants/${restaurant._id}`);
  };
  return (
    <div
      className="restaurant-card "
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: "1px solid #ddd",
        borderRadius: "4px",
        overflow: "hidden",
        transition: "transform 0.2s",
        width: "330px",
        height: "360px",
        boxShadow: "5px 5px 5px #D3D3D3",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={restaurant.image_url[0]}
        alt={restaurant.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "16px", fontFamily: "Inter" }}>
        <h3 style={{ margin: "0 0 8px" }}>{restaurant.name}</h3>
        <p style={{ margin: "0", color: "#555" }}>{restaurant.address}</p>
      </div>
    </div>
  );
};

const RestaurantListItemComponent = ({
  currentUser,
  setCurrentUser,
  listType,
}) => {
  const [favorites, setFavorites] = useState([]);
  const [visited, setVisited] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRestaurants = async () => {
      console.log("listType ", listType);
      try {
        const data = await RestaurantService.getUserRestaurantIteams(
          currentUser.user._id,
          listType
        );
        if (listType === "favorites") {
          setFavorites(data);
        } else {
          setVisited(data);
        }

        console.log("item log", data);
      } catch (err) {
        setError("Failed to load user favorite restaurants");
      }
    };

    if (listType) {
      fetchUserRestaurants();
    }
  }, [currentUser, listType]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }} className="mt-4 ms-3">
      <h1 style={{ fontFamily: "Inter", weight: "bold" }}>
        {listType === "favorites"
          ? "Favorite Restaurants"
          : "Visited Restaurants"}
      </h1>
      <div
        className="mt-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: "50px 0px",
        }}
      >
        {listType === "favorites"
          ? favorites.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))
          : visited.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
      </div>
    </div>
  );
};

export default RestaurantListItemComponent;
