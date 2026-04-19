/**
 * Encore API base (e.g. `lo-app-backend` after `encore run`, default port 4000).
 * Set `EXPO_PUBLIC_API_URL` in `.env` when the gateway URL differs.
 */
function getApiBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (typeof fromEnv === "string" && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/$/, "");
  }
  return "http://localhost:4000";
}

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(
  path: string,
  init?: { method?: string; body?: unknown; bearer?: string },
): Promise<T> {
  const base = getApiBaseUrl();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (init?.bearer) {
    headers.Authorization = `Bearer ${init.bearer}`;
  }

  let body: string | undefined;
  if (init?.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(init.body);
  }

  const res = await fetch(url, {
    method: init?.method ?? "GET",
    headers,
    body,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const parsedBody = isJson
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const message =
      typeof parsedBody === "object" &&
      parsedBody !== null &&
      "message" in parsedBody &&
      typeof (parsedBody as { message: unknown }).message === "string"
        ? (parsedBody as { message: string }).message
        : `Request failed (${res.status})`;
    throw new ApiError(message, res.status, parsedBody);
  }

  return parsedBody as T;
}
