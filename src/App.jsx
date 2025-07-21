import { Outlet } from "react-router-dom";
import { lazy } from "react";
import useLoadingStore from "./store/loadingStore.js";
const Navbar = lazy(() => import("../components/Navbar.jsx"));
import { Suspense, useEffect } from "react";
const Footer = lazy(() => import("../components/Footer.jsx"));
const Loading = lazy(() => import("../components/Loading.jsx"));
const ScrollToTop = lazy(() => import("../components/ScrollToTop.jsx"));
import LoadingFallback from "../components/LoadingFallback.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isLoading, startLoading, hasInitiallyLoaded } = useLoadingStore();

  useEffect(() => {
    // Start loading sequence on app mount
    const loadingInterval = startLoading();

    // Cleanup function
    return () => {
      if (loadingInterval) {
        clearInterval(loadingInterval);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Show loading screen during initial load only
  if (isLoading && !hasInitiallyLoaded) {
    return <Loading />;
  }

  // Show main app content after initial loading is complete
  return (
    <>
      <Navbar />
      {/* ScrollToTop component to reset scroll position on route change */}
      {/* This is useful for single-page applications to maintain a good user experience */}
      <ScrollToTop />
      {/* Suspense fallback for lazy-loaded components */}
      {/* This will show a loading spinner while the Outlet content is being loaded */}
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
       {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              toastStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "white",
                fontFamily: "inherit",
                fontSize: "14px",
                fontWeight: "300",
                letterSpacing: "0.5px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
              }}
              progressStyle={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 100%)",
                height: "2px",
              }}
              closeButtonStyle={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "16px",
              }}
              style={{
                zIndex: 9999,
              }}
            />
      <Footer />
    </>
  );
};

export default App;
