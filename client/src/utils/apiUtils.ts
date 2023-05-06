export async function request<T>(
  url: string,
  config: RequestInit = { method: "POST" }
): Promise<T> {
  return (
    fetch(url, config)
      // When got a response call a `json` method on it
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Something went wrong");
      })
      // and return the result data.
      .then((data) => data as T)
  );
}
