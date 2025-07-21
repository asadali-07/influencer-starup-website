import { create } from "zustand";

const useLoadingStore = create((set, get) => ({
  isLoading: true, // Start with true for initial load
  loadingProgress: 0,
  loadingMessage: "Initializing LUXE Collection...",
  hasInitiallyLoaded: false,

  setLoading: (loading) => set({ isLoading: loading }),

  setLoadingProgress: (progress) => set({ loadingProgress: progress }),

  setLoadingMessage: (message) => set({ loadingMessage: message }),

  startLoading: () => {
    const { hasInitiallyLoaded } = get();

    // If already loaded before, don't start loading sequence
    if (hasInitiallyLoaded) {
      set({ isLoading: false }); // Ensure loading is false
      return null;
    }

    // Set loading state for first time
    set({
      isLoading: true,
      loadingProgress: 0,
      loadingMessage: "Initializing LUXE Collection...",
    });

    const loadingSteps = [
      { message: "Initializing LUXE Collection...", progress: 20 },
      { message: "Loading luxury fragrances...", progress: 40 },
      { message: "Preparing your experience...", progress: 60 },
      { message: "Crafting perfection...", progress: 80 },
      { message: "Welcome to LUXE...", progress: 100 },
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const { message, progress } = loadingSteps[currentStep];

        set({
          loadingProgress: progress,
          loadingMessage: message,
        });

        currentStep++;
      } else {
        clearInterval(interval);
        // Complete loading sequence
        setTimeout(() => {
          set({
            isLoading: false,
            hasInitiallyLoaded: true,
          });
        }, 1000);
      }
    }, 1000);

    return interval;
  },

  completeLoading: () =>
    set({
      isLoading: false,
      loadingProgress: 100,
      hasInitiallyLoaded: true,
    }),

  resetLoading: () =>
    set({
      isLoading: true,
      loadingProgress: 0,
      loadingMessage: "Initializing LUXE Collection...",
      hasInitiallyLoaded: false,
    }),
}));

export default useLoadingStore;
