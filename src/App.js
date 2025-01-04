import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import RestaurantComponent from "./components/restaurant-component";
import AuthService from "./services/auth.service";
import ProfileComponent from "./components/profile-component";
import RestaurantViewPage from "./components/restaurantlist-view-component";
function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route index element={<HomeComponent />} />
          <Route path="/homepage" element={<HomeComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route
            path="login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />{" "}
          <Route
            path="profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/api/restaurants/:id"
            element={
              <RestaurantComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/api/restaurants/findByName/:theName"
            element={
              <RestaurantComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/api/restaurants/favrestaurant/:userID"
            element={
              <RestaurantViewPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
