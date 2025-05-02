import { AuthResponseConfig, ResponseConfig } from "../interfaces";

interface Props {
  route: string;
}

type AllResponse = ResponseConfig | AuthResponseConfig;

export default async function GetRequest({ route }: Props) {
  try {
    const reqInit: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },

      method: "GET",
    };

    const response = (
      await fetch(`${route}`, reqInit)
    ).json() as unknown as AllResponse;

    return response;
  } catch (err) {
    throw new Error(err as string);
  }
}
