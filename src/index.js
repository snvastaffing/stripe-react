import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HomePage } from './pages/Home';
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import { ProductsDetail } from './pages/ProductsDetail';


const router = createBrowserRouter([
  {
    path: "/productsdetail/:productId",
    element: (
        <>
          <ProductsDetail></ProductsDetail>
          <Link to="/productsdetail/:productId"></Link>
        </>
    )
  },
  {
    path: "/",
    element: (
        <>
          <HomePage></HomePage>
          <Link to="/"></Link>
        </>
    )
  },
  // {
  //   path: "/checkout/:checkoutId",
  //   element: (
  //       <>
  //         <Checkout></Checkout>
  //         <Link to="/checkout/:checkoutId"></Link>
  //       </>
  //   )
  // },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App />  */}
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
