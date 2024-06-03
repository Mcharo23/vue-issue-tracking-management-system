import { ISSUE_TYPE } from "../lib/Type";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

export const getIssueTypes = async (): Promise<{
  success: boolean;
  data?: ISSUE_TYPE[];
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
      `http://localhost:3000/issue-type/`,
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

    const data: ISSUE_TYPE[] = await response.json();

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Unknown error occured" };
  }
};

export const newIssueType = async (
  name: string
): Promise<{ message: string }> => {
  const authStore = useAuthStore();
  const router = useRouter();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authStore.authToken}`);

  const raw = JSON.stringify({
    name: name,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response: Response = await fetch(
      `http://localhost:3000/issue-type/`,
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
