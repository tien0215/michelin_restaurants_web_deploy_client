import axios from "axios";
const API_URL = "http://localhost:8080/api/restaurants";
// Base URL for the API

class RestaurantService {
  constructor() {
    if (localStorage.getItem("user")) {
      this.token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      this.token = "";
    }
  }

  getRestaurantById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getRestaurantByName = async (name) => {
    try {
      const response = await axios.get(`${API_URL}/findByName/${name}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  postComment = async (id, content, userID) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/comments/${id}`,
        {
          content,
          user: userID, // Replace with actual user ID
        },
        {
          headers: {
            Authorization: this.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateResturant = async (restaurantId, description) => {
    try {
      const response = await axios.put(
        `${API_URL}/${restaurantId}/description`,
        {
          description,
        },
        {
          headers: {
            Authorization: this.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  saveToList = async (userId, restaurantId, listType) => {
    try {
      const response = await axios.put(
        `${API_URL}/savelist/${restaurantId}/${userId}/${listType}`,
        {},
        {
          headers: {
            Authorization: this.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteFromList = async (userId, restaurantId, listType) => {
    try {
      const response = await axios.put(
        `${API_URL}/deletelist/${restaurantId}/${userId}/${listType}`,
        {},
        {
          headers: {
            Authorization: this.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  getRandomRestaurants = async () => {
    try {
      const response = await axios.get(`${API_URL}/gallery/random-restaurants`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getUserRestaurantIteams = async (id, listType) => {
    console.log("listType: " + listType);
    // Replace with your API endpoint to fetch user favorites
    try {
      const response = await axios.get(`${API_URL}/favrestaurant/${id}`, {
        params: { listType }, // Pass listType as a query parameter
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
export default new RestaurantService();
