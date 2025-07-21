import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create()(
  persist(
    (set) => ({
      wishlist: [],
      addToWishlist: (item) =>
        set((state) => ({
          wishlist: state.wishlist.find((i) => i.id === item.id)
            ? [...state.wishlist]
            : [...state.wishlist, item],
        })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "wishlist-storage", // correct and unique storage key
    }
  )
);
