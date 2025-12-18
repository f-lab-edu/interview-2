export interface CommonResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface ErrorResponse {
  success: boolean;
  message: string;
}

const request = async <Res>(
  url: string,
  init: RequestInit = {}
): Promise<CommonResponse<Res>> => {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  const response = await fetch(url, { ...init, headers });

  const body = await response.json();

  if (!response.ok) {
    const maybeError = body as Partial<ErrorResponse> | undefined;
    throw {
      url,
      status: response.status,
      statusText: response.statusText,
      message:
        typeof maybeError?.message === "string"
          ? maybeError.message
          : undefined,
      data: body
    };
  }

  return body as CommonResponse<Res>;
};

export const http = {
  get: <Res>(url: string, options: RequestInit = {}) =>
    request<Res>(url, { ...options, method: "GET" }),

  post: async <Req, Res>(url: string, body: Req, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type"))
      headers.set("Content-Type", "application/json");
    return request<Res>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body)
    });
  }
};
