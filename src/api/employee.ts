import { EMPLOYEE } from "../lib/Type";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

export const employees = async (): Promise<{
  success: boolean;
  data?: EMPLOYEE[];
  message?: string;
}> => {
  const authStore = useAuthStore();

  const myHeaders = new Headers();
  const router = useRouter();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authStore.authToken}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response: Response = await fetch(
      `http://localhost:3000/user/`,
      requestOptions
    );

    if (!response.ok) {
      const errorDetail = await response.json();

      if (response.status === 401) {
        router.push("/");
        authStore.logout();
        
      }

      throw new Error("Network response was not ok");
    }

    const data: EMPLOYEE[] = await response.json();

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Unknown error occured" };
  }
};

export const deleteEmployee = async (user_id: string): Promise<{message: string}> => {
  const authStore = useAuthStore();
  const router = useRouter();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authStore.authToken}`);

  const raw = JSON.stringify({
    user_id: user_id,
  });

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(
      `http://localhost:3000/user/`,
      requestOptions
    );

    if (!response.ok) {
      const errorDetail = await response.json();

      if (response.status === 401) {
        router.push("/");
        authStore.logout();
      }

      throw new Error("Network response was not ok");
    }

    const res: { detail: string } = await response.json();

    return { message: res.detail };

  } catch (error) {
    console.error(error);
    return { message: "Unknown error occured" };
  }
}

export const ativateEmployee = async (
  user_id: string
): Promise<{
  message: string;
}> => {
  const authStore = useAuthStore();
  const router = useRouter();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authStore.authToken}`);

  const raw = JSON.stringify({
    user_id: user_id,
  });

  const requestOptions: RequestInit = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response: Response = await fetch(
      `http://localhost:3000/user/`,
      requestOptions
    );

    if (!response.ok) {
      const errorDetail = await response.json();

      if (response.status === 401) {
        alert(errorDetail.detail);
        authStore.logout();
        router.push("/");
      }

      throw new Error("Network response was not ok");
    }

    const res: { detail: string } = await response.json();

    return { message: res.detail };
  } catch (error) {
    console.error(error);
    return { message: "Unknown error occured" };
  }
};

export const addNewDeveloper = async (
  first_name: string,
  last_name: string,
  email: string
): Promise<{
  message: string;
}> => {
  const authStore = useAuthStore();
  const router = useRouter();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authStore.authToken}`);

  const raw = JSON.stringify({
    first_name: first_name,
    last_name: last_name,
    email: email,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response: Response = await fetch(
      `http://localhost:3000/user/`,
      requestOptions
    );

    if (!response.ok) {
      const errorDetail = await response.json();

      if (response.status === 401) {
        alert(errorDetail.detail);
        authStore.logout();
        router.push("/");
      }

      throw new Error("Network response was not ok");
    }

    const res: { detail: string } = await response.json();

    return { message: res.detail };
  } catch (error) {
    console.error(error);
    return { message: "Unknown error occured" };
  }
};
