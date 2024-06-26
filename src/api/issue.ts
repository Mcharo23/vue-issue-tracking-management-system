import { ISSUE, ISSUE_PROGRESS } from "../lib/Type";
import { ROLE } from "../lib/enum";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const getIssues = async (): Promise<{
  success: boolean;
  data?: ISSUE[];
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
    const response: Response = await fetch(`${apiUrl}/issue`, requestOptions);

    if (!response.ok) {
      const errorDetail = await response.json();

      if (response.status === 401) {
        alert(errorDetail.detail);
        authStore.logout();
        router.push("/");
      }

      throw new Error("Network response was not ok");
    }

    const data: ISSUE[] = await response.json();

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Unknown error occured" };
  }
};

export const getIssue = async (
  issue_id: string
): Promise<{
  success: boolean;
  data?: ISSUE_PROGRESS;
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
      `${apiUrl}/issue/progress/${issue_id}`,
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

    const data: ISSUE_PROGRESS = await response.json();
    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Unknown error occured" };
  }
};

export const getIssuesByAssigneeId = async (): Promise<{
  success: boolean;
  data?: ISSUE[];
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
      `${apiUrl}/issue/assignee`,
      requestOptions
    );

    if (!response.ok) {
      const errorDetail = await response.json();

      if (response.status === 401) {
        alert(errorDetail.detail);
        authStore.logout();
        router.push("/");
      }
      console.log(errorDetail);
      throw new Error("Network response was not ok");
    }

    const data: ISSUE[] = await response.json();

    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Unknown error occured" };
  }
};

export const newIssue = async (
  project_id: string,
  issue_type_id: string,
  summary: string,
  description: string,
  priority: string,
  status: string,
  selectedDeveoper: string
): Promise<{
  message: string;
}> => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    throw new Error("User is not authenticated.");
  }

  const router = useRouter();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authStore.authToken}`);

  const raw = JSON.stringify({
    project_id:
      typeof project_id === "number" ? Number(project_id) : project_id,
    issue_type_id:
      typeof issue_type_id === "number" ? Number(issue_type_id) : issue_type_id,
    summary: summary,
    description: description,
    priority: priority,
    status: status,
    assignee_id:
      typeof selectedDeveoper === "number"
        ? Number(selectedDeveoper)
        : selectedDeveoper,
    comments: [],
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response: Response = await fetch(`${apiUrl}/issue`, requestOptions);

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

export const updateIssueStatus = async (
  issue_id: string,
  comment: string,
  status: ROLE
): Promise<{
  message: string;
}> => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    throw new Error("User is not authenticated.");
  }

  const router = useRouter();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${authStore.authToken}`);

  const raw = JSON.stringify({
    issue_id: typeof issue_id === "number" ? Number(issue_id) : issue_id,
    status: status,
    comment: comment,
  });

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response: Response = await fetch(
      `${apiUrl}/issue/status`,
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
