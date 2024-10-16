import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // Load user from localStorage
    token: localStorage.getItem("token") || null, // Load token from localStorage
  }),
  getters: {
    isAuthenticated: (state) => !!state.token, // Check authentication based on token existence
  },
  actions: {
    login(user, token) {
      this.user = user; // Set user information
      this.token = token; // Set token information

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout() {
      this.user = null; // Reset user information
      this.token = null; // Reset token information

      // Clear from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
