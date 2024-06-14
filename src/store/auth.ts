import { jwtDecode } from "jwt-decode";
import { USER } from "../lib/Type";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: (): { authToken: string | null; user: USER | null } => ({
    authToken: localStorage.getItem("token") as string | null,
    user: ((): USER | null => {
      if (localStorage.getItem("token")) {
        const user: USER = jwtDecode(localStorage.getItem("token") as string);
        user.role = user.role.toLowerCase();
        return user;
      }

      return null;
    })(),
  }),
  getters: {
    getAuthToken: (state): string | null => state.authToken,
    getUser: (state): USER | null => state.user,
  },
  actions: {
    initializeStore() {
      const token = localStorage.getItem("token");
      if (token) {
        const user: USER = jwtDecode(token);
        this._setAuthToken(token);
        this._setUser(user);
      }
    },
    _setAuthToken(authToken: string | null) {
      this.$patch({ authToken });
      if (authToken) {
        localStorage.setItem("token", authToken);
      } else {
        localStorage.removeItem("token");
      }
    },
    _setUser(user: USER | null) {
      this.$patch({ user });
    },
    async authenticate(
      email: string,
      password: string
    ): Promise<{
      success: boolean;
      message?: string;
    }> {
      const apiUrl = import.meta.env.VITE_APP_API_URL;

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: email,
        password: password,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response: Response = await fetch(`${apiUrl}/`, requestOptions);

        if (!response.ok) {
          const errorDetail = await response.json();

          if (response.status === 401) {
            return { success: false, message: errorDetail.detail };
          }

          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (!data || !data.token) {
          return { success: false, message: "Missing token in response" };
        }

        const user: USER = jwtDecode(data.token);
        user.role = user.role.toLowerCase();

        this._setAuthToken(data.token);
        this._setUser(user);

        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false, message: "Unknown error occurred" };
      }
    },
    logout() {
      this.$patch({
        authToken: null,
        user: null,
      });
      localStorage.removeItem("token");
    },
  },
});
