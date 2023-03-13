import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRadio,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Checkout.css";
import { CreateCustomer } from "../../component/customer";
import { APIKey } from "../../apikey/APIKey";
import { Button } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./v/CheckoutForm"
import api from "../../api"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = api.getPublicStripeKey().then(key => loadStripe(key));

export const Checkout = () => {
  let urlParams = window.location.pathname.split("/");
  const [product,setProduct] = useState()
  useEffect(() => {
    const fetchProductData = () => {
      var productId = urlParams[urlParams.length - 1];
      var config = {
        method: "GET",
        url: "https://dummyjson.com/products/" + productId,
      };

      axios(config)
        .then(function (response) {
          console.log("Each productDetail Data", response.data);
          setProduct(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchProductData();
  }, []);

  if (!product) return <>Loading ....</>;
  return (
    <>
           <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
    </>
  );
};
