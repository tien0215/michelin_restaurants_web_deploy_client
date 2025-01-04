import React, { useState, useEffect } from "react";
import RestaurantService from "../services/restaurant.service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StarImag = ({ className, style, onClick, size }) => {
  return (
    <img
      src="/images/star.png" // Adjust the path if necessary
      alt="Star"
      className={`me-3 ${className || ""}`} // Append additional classes if provided
      onClick={onClick} // Attach the onClick handler if provided
      style={{
        height: `${size}px`,
        width: `${size}px`,
        ...style, // Merge custom styles
      }}
    />
  );
};

const MichelinRating = ({ michelinType }) => {
  if (michelinType === "3-star-michelin") {
    return (
      <div className="d-flex ms-3 pt-1">
        <StarImag size={30} />
        <StarImag size={30} />
        <StarImag size={30} />
      </div>
    );
  } else if (michelinType === "2-star-michelin") {
    return (
      <div className="d-flex ms-3 pt-1">
        <StarImag size={30} />
        <StarImag size={30} />
      </div>
    );
  } else if (michelinType === "1-star-michelin") {
    return (
      <div className="d-flex ms-3 pt-1">
        <StarImag size={30} />
      </div>
    );
  } else if (michelinType === "bib-gourmand") {
    return (
      <div className="d-flex">
        <img
          src="/images/bib.png" // Adjust the path if necessary
          alt="bib gourmand"
          style={{
            height: "40px",
            width: "60px",
            paddingTop: "5px",
            paddingRight: "0px",
          }}
        />
        <p
          style={{
            fontSize: "20px",
            color: "#c02434",
            paddingTop: "8px",
          }}
        >
          Bib-Gourmand
        </p>
      </div>
    );
  } else if (michelinType === "the-plate-michelin") {
    return (
      <p
        style={{
          marginLeft: "10px",
          fontSize: "20px",
          color: "#c02434",
          paddingTop: "5px",
        }}
      >
        Michelin Selected
      </p>
    );
  }
  return null;
};
const HomeComponent = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          left: "10px", // Set the position as needed
          zIndex: 1,
          background: "grey",
        }}
        onClick={onClick}
      />
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          right: "10px", // Set the position as needed
          zIndex: 1,
          background: "grey",
        }}
        onClick={onClick}
      />
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    arrows: true,
    accessibility: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  useEffect(() => {
    const fetchRandomRestaurants = async () => {
      try {
        const data = await RestaurantService.getRandomRestaurants();
        setRestaurants(data);
        console.log(data);
      } catch (err) {
        setError("Failed to load random restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRestaurants();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="container py-4">
        <header className="mb-4">
          <div className="home-grid mt-5">
            {/* First Row*/}
            <h1
              className="fw-bold mb-0"
              style={{ fontFamily: "Inter", fontSize: "350px" }}
            >
              Taste
            </h1>

            {/* Second Row: with images */}
            <div className="d-flex align-items-center mt-3">
              {/* text */}
              <h1
                className="fw-bold mb-0 me-3"
                style={{ fontFamily: "Inter", fontSize: "350px" }}
              >
                the
              </h1>
              {/* Images */}
              <div
                className="d-flex"
                style={{ paddingLeft: "50px", paddingTop: "100px" }}
              >
                <StarImag size={100}></StarImag>
                <StarImag size={100}></StarImag>
                <StarImag size={100}></StarImag>
              </div>
            </div>

            {/* Third Row */}
            <h1
              className="fw-bold mb-0 mt-3 mb-5"
              style={{ fontFamily: "Inter", fontSize: "350px" }}
            >
              Stars
            </h1>

            {/*<p
              className="fs-5 mt-4"
              style={{ fontFamily: "Inter", fontSize: "24px" }}
            >
              Share your experiences at Michelin-recommended restaurants—a space
              for you to connect with fellow Michelin foodies and record your
              journey of tasting the ‘Stars’.
            </p> */}
          </div>
        </header>

        <section className="mb-5">
          <div className="slider-container">
            <Slider {...settings}>
              <div>
                <img
                  src={restaurants[0].image_url[0]}
                  className="w-100 h-100"
                  alt={restaurants[0].name}
                />

                <p
                  style={{
                    display: "flex",
                    width: "200%",
                    height: "90px",
                    left: "10px",
                    fontSize: "26px",
                    color: "#fff",
                    backgroundColor: "black",
                    paddingTop: "20px",
                    paddingLeft: "10px",
                    fontFamily: "Inter",
                    fontStyle: "italic",
                  }}
                >
                  {restaurants[0].name}
                  <MichelinRating
                    michelinType={restaurants[0].michelin_type}
                  ></MichelinRating>
                </p>
              </div>
              <div>
                <img
                  src={restaurants[0].image_url[1]}
                  className="w-100 h-100"
                  alt={restaurants[0].name}
                />
              </div>

              <div>
                <img
                  src={restaurants[1].image_url[0]}
                  className="w-100 h-100"
                  alt={restaurants[1].name}
                />
                <p
                  style={{
                    display: "flex",
                    width: "200%",
                    height: "90px",
                    left: "10px",
                    fontSize: "26px",
                    color: "#fff",
                    backgroundColor: "black",
                    paddingTop: "20px",
                    paddingLeft: "10px",
                    fontFamily: "Inter",
                    fontStyle: "italic",
                  }}
                >
                  {restaurants[1].name}
                  <MichelinRating
                    michelinType={restaurants[1].michelin_type}
                  ></MichelinRating>
                </p>
              </div>
              <div>
                <img
                  src={restaurants[1].image_url[1]}
                  className="w-100 h-100"
                  alt={restaurants[1].name}
                />
              </div>
              <div>
                <img
                  src={restaurants[2].image_url[0]}
                  className="w-100 h-100"
                  alt={restaurants[2].name}
                />
                <p
                  style={{
                    display: "flex",
                    width: "200%",
                    height: "90px",
                    left: "10px",
                    fontSize: "26px",
                    color: "#fff",
                    backgroundColor: "black",
                    paddingTop: "20px",
                    paddingLeft: "10px",
                    fontFamily: "Inter",
                    fontStyle: "italic",
                  }}
                >
                  {restaurants[2].name}
                  <MichelinRating
                    michelinType={restaurants[2].michelin_type}
                  ></MichelinRating>
                </p>
              </div>
              <div>
                <img
                  src={restaurants[2].image_url[1]}
                  className="w-100 h-100"
                  alt={restaurants[2].name}
                />
              </div>
            </Slider>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeComponent;
