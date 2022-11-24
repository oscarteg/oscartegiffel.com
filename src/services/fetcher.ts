export default async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  return fetch(input, init).then((response) => response.json());
}
