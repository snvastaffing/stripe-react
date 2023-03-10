import { useEffect, useRef, useState } from "react";
import { Carousel, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";

export const ProductsDetail = (props) => {
  let urlParams = window.location.pathname.split("/");
  let [productsDetail, setProductsDetail] = useState({});

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
        <Carousel fade>
          {productsDetail?.images?.map((item, index) => {
            return (
              <Carousel.Item>
                <img className="d-block w-100" src={item} alt="First slide" />
                <Carousel.Caption>
                  <h1 style={{ color: "white" }}>{productsDetail.brand}</h1>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <br />
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
        <div class="container text-center mb-10">
          <Link
            className="btn btn-primary"
            to={"/checkout/" + productsDetail.id}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};
