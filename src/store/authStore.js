import { create } from "zustand";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  accessToken: { value: Cookies.get("token") || null },

  setAccessToken: (token) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    set({ accessToken: { value: token } });
  },

  clearAccessToken: () => {
    Cookies.remove("token");
    set({ accessToken: { value: null } });
  },
}));
