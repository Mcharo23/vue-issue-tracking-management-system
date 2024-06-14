import { PROJECT } from "../lib/Type";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const projects = async (): Promise<{
  success: boolean;
  data?: PROJECT[];
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
      `${apiUrl}/project/`,
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

    const data: PROJECT[] = await response.json();

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Unknown error occured" };
  }
};

export const newProject = async (
  project_name: string,
  description: string
): Promise<{
  message: string;
}> => {
  const authStore = useAuthStore();
  const router = useRouter();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authStore.authToken}`);

  const raw = JSON.stringify({
    project_name: project_name,
    description: description,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response: Response = await fetch(
      `${apiUrl}/project/`,
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
