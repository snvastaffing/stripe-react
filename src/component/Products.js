import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const Product = (props) => {
  const [product, setProduct] = useState(props);
  console.log("product:" + JSON.stringify(product));

  return (
    <Card
      style={{ width: "18rem" }}
      className="m-2 d-sm-flex align-items-center justify-content-between"
    >
      <Card.Img
        variant="top"
        src={product.imageSrc}
        style={{ width: "17rem", height: "10rem" }}
      />
      <Card.Body>
        <Card.Title>{product.brand}</Card.Title>
        <Card.Text>$ {product.price}</Card.Text>
          <Link className="btn btn-primary" to={props.identifier}>
            Details
          </Link>
      </Card.Body>
    </Card>
  );
};

export const Products = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    var config = {
      method: "GET",
      url: "https://dummyjson.com/products",
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log("products", products);

  if (!products) return <>Loading ....</>;
  return (
    <>
      <div className="content-area">
        <section className="p-lg-0 pt-lg-5 text-center text-sm-start background-blue">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <Row>
                <h1>Products</h1>
              </Row>
              <Container>
                <Row>
                  {products?.products?.map((item) => (
                    <Col md={3} xs={12} sm={6}>
                      <Product
                        className="col col-md-3"
                        brand={item.brand}
                        price={item.price}
                        imageSrc={item.thumbnail}
                        identifier={"/productsdetail/" + item.id}
                      ></Product>
                    </Col>
                  ))}
                </Row>
              </Container>
              );
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
