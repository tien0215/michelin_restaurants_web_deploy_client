import React, { useState } from "react";
import RestaurantListItemComponent from "./restaurantlist-item-component";

const RestaurantViewPage = ({ currentUser, setCurrentUser }) => {
  const [currentView, setCurrentView] = useState("favorites");

  return (
    <div>
      {/* Buttons to toggle views */}
      <div
        className="button-group"
        style={{ textAlign: "center", margin: "50px 0", fontFamily: "Inter" }}
      >
        <button
          onClick={() => setCurrentView("favorites")}
          className={`toggle-button ${
            currentView === "favorites" ? "active" : ""
          }`}
        >
          Show Favorite Restaurants
        </button>
        <button
          onClick={() => setCurrentView("visited")}
          className={`toggle-button ${
            currentView === "visited" ? "active" : ""
          }`}
        >
          Show Visited Restaurants
        </button>
        <style>
          {`
        .button-group {
        display: flex;
        justify-content: center;
        gap: 10px; /* Spacing between buttons */
      }

      .toggle-button {
        background-color: transparent;
        color: black;
        border: none;
        padding: 10px 20px;
        border-radius: 10px; /* Rounded corners */
        cursor: pointer;
        font-size: 22px;
        font-Family: Inter;
        transition: all 0.3s ease; /* Smooth color transition */
        
      }
      .toggle-button.active {
        background-color: black;
        color: white;
      }
      .toggle-button:hover {
          background-color: #f0f0f0;
          color :black;

        }
    `}
        </style>
      </div>
      <hr size="4" width="100%" align="center"></hr>
      {/* Conditionally render components based on currentView */}
      {currentView === "favorites" && (
        <div className="ms-5">
          <RestaurantListItemComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            listType={currentView}
          />
        </div>
      )}

      {currentView === "visited" && (
        <div className="ms-5">
          <RestaurantListItemComponent
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            listType={currentView}
          />
        </div>
      )}
    </div>
  );
};

export default RestaurantViewPage;
