import { AuthResponseConfig, ResponseConfig } from "../interfaces";

interface Props {
  data: object;
  route: string;
}

type AllResponse = ResponseConfig | AuthResponseConfig;

export default async function SendData({ data, route }: Props) {
  try {
    const reqInit: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    };

    const response = (
      await fetch(`${route}`, reqInit)
    ).json() as unknown as AllResponse;

    return response;
  } catch (err) {
    throw new Error(err as string);
  }
}
