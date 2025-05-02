import { AuthResponseConfig, userDataInterface } from "../interfaces";

interface Props {
  data: Omit<userDataInterface,"username">
  route: string;
}

export default async function AuthPost({ data, route }: Props) {
  try {
    const reqInit: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
      method: "POST",
    };

    const response = (await (
      await fetch(`${route}`, reqInit)
    ).json()) as AuthResponseConfig;

    return response;
  } catch (err) {
    throw new Error(err as string);
  }
}
