import axios from "axios";
import Auth from "./Auth";

export enum RestMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

interface RestRequest {
  method: RestMethod;
  resource: `/${string}`;
  params?: { [key: string]: string };
  body?: object;
  headers?: {
    [key: string]: string;
  };
}

export enum RestType {
  SUCCESS,
  ERROR,
}

interface RestSuccessResponse<T> {
  type: RestType.SUCCESS;
  data: T;
}

interface RestErrorResponse {
  type: RestType.ERROR;
  data: string;
}

type RestResponse<T> = RestSuccessResponse<T> | RestErrorResponse;

const BASE_URL = "http://localhost:8080";

const Rest = (() => {
  const user = Auth.user();

  const send = async <T>(request: RestRequest) => {
    let response = {} as RestResponse<T>;

    await axios
      .request({
        method: request.method,
        url: `${BASE_URL}${request.resource}`,
        params: request.params,
        data: request.body,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => (response = { type: RestType.SUCCESS, data: res.data as T }))
      .catch((err) => (response = { type: RestType.ERROR, data: err.response.data as string }));

    return response;
  };

  // TODO: Promise.all 을 사용하는 병렬처리 함수 만들기

  return { send };
})();

export default Rest;
