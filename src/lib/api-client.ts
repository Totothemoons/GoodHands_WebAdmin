import { env } from '@/lib/env'

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown }

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...requestOptions } = options
  const response = await fetch(`${env.apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`, {
    ...requestOptions,
    headers: { Accept: 'application/json', ...(body === undefined ? {} : { 'Content-Type': 'application/json' }), ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: env.withCredentials ? 'include' : 'same-origin',
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload: unknown = contentType.includes('application/json') ? await response.json() : undefined

  if (!response.ok) {
    throw new ApiError(`API request failed (${response.status})`, response.status, payload)
  }

  return payload as T
}
