import { useEffect, useRef, useState } from "react";
import { Carousel, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import api from "../api";
import CheckoutForm from "./checkout/CheckoutForm";

const stripePromise = api.getPublicStripeKey().then(key => loadStripe(key));

export const ProductsDetail = (props) => {
  let urlParams = window.location.pathname.split("/");
  let [productsDetail, setProductsDetail] = useState({});
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //   console.log("urlParams", urlParams)

  useEffect(() => {
    async function getProduct() {
      // var raw = JSON.stringify({
      //     productId: urlParams[urlParams.length - 1]
      // });
      var productId = urlParams[urlParams.length - 1];

      var config = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };

      try {
        let url = "https://dummyjson.com/products/" + productId;
        await fetch(url, config)
          .then((response) => response.json())
          .then((data) => {
            console.log("Each productDetail Data", data);
            setProductsDetail(data);
          });
      } catch (error) {
        console.log("Error ", error);
      }
    }
    getProduct();
  }, []);

  console.log("productsDetail", productsDetail);

  if (!productsDetail) return <>Loading ....</>;

  return (
    <>
      <div className="container">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {productsDetail?.images?.map((item, index) => { 
            return (
              <Carousel.Item>
                <img className="d-block w-100" src={item} alt="First slide" style={{ width: "100px", height: "1000px" }}/>
                <Carousel.Caption>
                  <h1 style={{ color: "white" }}>{productsDetail.brand}</h1>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <br />

        <div class="container text-center mb-10">

        <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
        <h1>{productsDetail.title}</h1>
        <Table striped borderless>
          <thead>
            <tr>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$ {productsDetail.price}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{productsDetail.rating}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{productsDetail.stock}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>DiscountPercentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{productsDetail.discountPercentage} %</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{productsDetail.description}</td>
            </tr>
          </tbody>
        </Table>
        
      </div>
    </>
  );
};
