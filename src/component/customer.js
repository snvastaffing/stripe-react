import { useEffect, useState } from "react";
import axios from "axios";
import { APIKey } from "../apikey/APIKey.js";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBCheckbox,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRadio,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";


export const CreateCustomer = (props) => {
  const [customer, setCustomer] = useState(null);

  // useEffect(() => {
  //   var qs = require("qs");
  //   var data = qs.stringify({});

  //   var config = {
  //     method: "POST",
  //     url: "https://api.stripe.com//v1/customers",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization: `Bearer ${APIKey}`,
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log("data", JSON.stringify(response.data));
  //       setCustomer(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const handleInputCustomer = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  console.log("Customer information: ", customer);

  return (
    <>
      <MDBCard className="mb-4">
        <MDBCardHeader className="py-3">
          <MDBTypography tag="h5" className="mb-0">
            Biling Details
          </MDBTypography>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput
                    label="Name"
                    id="form1"
                    type="text"
                    onChange={(e) =>
                      handleInputCustomer("name", e.target.value)
                    }
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput
                wrapperClass="mb-4"
                label="Address"
                id="form3"
                type="text"
                onChange={(e) => handleInputCustomer("address", e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form4"
                type="email"
                onChange={(e) => handleInputCustomer("email", e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Phone"
                id="form5"
                type="number"
                onChange={(e) => handleInputCustomer("phone", e.target.value)}
              />
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="checkoutForm2"
                label=" Save this information for next time"
                defaultChecked
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};
