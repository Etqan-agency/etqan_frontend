import type { ApiFieldErrors, Paginated } from "@/types/api"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"

export class ApiError extends Error {
  status: number
  fieldErrors: ApiFieldErrors

  constructor(status: number, fieldErrors: ApiFieldErrors) {
    super(`API request failed with status ${status}`)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

export async function apiGet<T>(
  path: string,
  revalidateSeconds = 300
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: revalidateSeconds },
  })

  if (!res.ok) {
    throw new ApiError(res.status, await safeParseErrors(res))
  }

  return res.json() as Promise<T>
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new ApiError(res.status, await safeParseErrors(res))
  }

  return res.json() as Promise<T>
}

async function safeParseErrors(res: Response): Promise<ApiFieldErrors> {
  try {
    const data = await res.json()
    if (data && typeof data === "object") {
      return data as ApiFieldErrors
    }
  } catch {
    // response body wasn't JSON; fall through to empty errors
  }
  return {}
}

export function unwrapList<T>(res: Paginated<T>): T[] {
  return res.results
}
