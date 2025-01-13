type SuccessResponse<TData> = {
  data: TData,
  error?: undefined,
}

type ErrorResponse = {
  data?: undefined,
  error: string
}

export type ActionResponse<TData> = SuccessResponse<TData> | ErrorResponse;