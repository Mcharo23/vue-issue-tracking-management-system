import { jwtDecode } from "jwt-decode";
import { USER } from "../lib/Type";

export const signIn = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  data?: { token: string };
  message?: string;
}> => {
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
    const response: Response = await fetch(
      `http://localhost:3000/`,
      requestOptions
    );

    if (!response.ok) {
      const errorDetail = await response.json();

      if (response.status === 401) {
        return { success: false, message: errorDetail.detail };
      }

      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const token: USER = jwtDecode(data.token);

    console.log(token);
    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Unknown error occured" };
  }
};
