import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://m.media-amazon.com/images/I/71jTTOiYMrL._SX3000_.jpg"
          alt=""
        />
        <div className="home_row">
          <Product
            id={1}
            title="The Alchemist, 25th Anniversary: A Fable About Following Your Dream"
            price={29.99}
            image="https://m.media-amazon.com/images/I/71zHDXu1TaL._SL1500_.jpg"
            rating={5}
          />
          <Product
            id={2}
            title="Amazon Essentials Men's Sherpa-Lined Full-Zip Hooded Fleece Sweatshirt"
            price={19.99}
            image="https://m.media-amazon.com/images/I/81vUhRnJijL._AC_SX342_.jpg"
            rating={4}
          />
        </div>
        <div className="home_row">
          <Product
            id={3}
            title="Apple iPhone 14, 128GB, Blue - Unlocked (Renewed)
"
            price={600}
            image="https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg"
            rating={5}
          />
          <Product
            id={4}
            title="2022 Panini Prestige NFL Football Blaster Box (66 cards/bx) Look for Blaster Exclusive Diamond Parallel"
            price={37}
            image="https://m.media-amazon.com/images/I/81Kl3Qur3kL._AC_SL1471_.jpg"
            rating={5}
          />
          <Product
            id={5}
            title="NFL PRO LINE Men's T.J. Watt Black Pittsburgh Steelers Team Player Jersey"
            price={129.99}
            image="https://m.media-amazon.com/images/I/71Dx8OM6XHS._AC_SX385_.jpg"
            rating={5}
          />
        </div>
        <div className="home_row">
          <Product
            id={6}
            title="SAMSUNG 49 Odyssey Neo G9 Series G95NA 4K UHD Curved Gaming Monitor, 240Hz, 1ms, Mini LED Display, G-Sync and FreeSync Premium Pro, LS49AG952NNXZA, White & Black"
            price={1251}
            image="https://m.media-amazon.com/images/I/81gf+wgrcfS._AC_SL1500_.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
