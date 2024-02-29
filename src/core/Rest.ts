import axios from "axios";
import Auth from "./Auth";
import useAuth from "./Auth";

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
}

export enum RestType {
  SUCCESS,
  ERROR,
}

interface RestResponse {
  type: RestType;
  data: object;
}

const BASE_URL = "http://localhost:8080";

const Rest = (() => {
  const user = useAuth((state) => state.user);
  async function send(request: RestRequest) {
    let response = {} as RestResponse;

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
      .then((res) => (response = { type: RestType.SUCCESS, data: res.data }))
      .catch((err) => (response = { type: RestType.ERROR, data: err.response.data }));

    return response;
  }

  async function sends(requests: RestRequest[]) {
    let responses = [] as RestResponse[];

    await Promise.all(requests.map(send)).then((ress) => (responses = ress));

    return responses;
  }

  return { send, sends };
})();

export default Rest;
