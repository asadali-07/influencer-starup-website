import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("../components/Home.jsx"));
const About = lazy(() => import("../components/About.jsx"));
const Login = lazy(() => import("../components/Login.jsx"));
const Signup = lazy(() => import("../components/Signup.jsx"));
const Products = lazy(() => import("../components/Products.jsx"));
const ProductDetail = lazy(() => import("../components/ProductDetail.jsx"));
const App = lazy(() => import("./App.jsx"));
const Cart = lazy(() => import("../components/Cart.jsx"));
const Wishlist = lazy(() => import("../components/Wishlist.jsx"));
const TermofService = lazy(() => import("../components/TermofService.jsx"));
const PrivacyPolicy = lazy(() => import("../components/PrivacyPolicy.jsx"));
const HelpCenter = lazy(() => import("../components/HelpCenter.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/cart", element: <Cart /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/about", element: <About /> },
      { path: "/termsofservice", element: <TermofService /> },
      { path: "/privacypolicy", element: <PrivacyPolicy /> },
      { path: "/helpcenter", element: <HelpCenter /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
