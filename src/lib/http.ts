export interface CommonResponse<T> {
  success: boolean
  message: string
  data?: T
}

export const http = {
  get: async <Res>(
    url: string,
    options: RequestInit = {}
  ): Promise<CommonResponse<Res>> => {
    const response = await fetch(url, {
      method: 'GET',
      ...options
    })

    if (!response.ok) {
      console.error(response)
    }

    return response.json() as Promise<CommonResponse<Res>>
  },

  post: async <Req, Res>(
    url: string,
    body: Req,
    options: RequestInit = {}
  ): Promise<CommonResponse<Res>> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      body: JSON.stringify(body),
      ...options
    })

    if (!response.ok) {
      console.error(response)
    }

    return response.json() as Promise<CommonResponse<Res>>
  }
}
