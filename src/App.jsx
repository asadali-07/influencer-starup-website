import { Outlet } from "react-router-dom";
import { lazy } from "react";
import useLoadingStore from "./store/loadingStore.js";
const Navbar = lazy(() => import("../components/Navbar.jsx"));
import { Suspense, useEffect } from "react";
const Footer = lazy(() => import("../components/Footer.jsx"));
const Loading = lazy(() => import("../components/Loading.jsx"));
const ScrollToTop = lazy(() => import("../components/ScrollToTop.jsx"));
import LoadingFallback from "../components/LoadingFallback.jsx";

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
      <Footer />
    </>
  );
};

export default App;
