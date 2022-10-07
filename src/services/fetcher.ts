import { Result, ResultAsync } from "neverthrow";

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<Result<JSON, Error>> {
  return ResultAsync.fromPromise<JSON, Error>(
    fetch(input, init).then((response) => response.json()),
    () => new Error("Unknown error")
  );
}
