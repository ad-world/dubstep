export enum StatusResponse {
  Success = "Success",
  Failure = "Failure",
  Unknown = "Unkown",
}

export type DubstepResponse<T = null> = {
  status: StatusResponse;
  data: T;
  message: string;
};
