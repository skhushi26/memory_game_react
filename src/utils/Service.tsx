import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
// import { showInfo } from "./AlertService";

const Service = (
  method: string,
  url: string,
  body: any = {},
  params: any = {},
  token: string = ""
) => {
  // const navigate = useNavigate();
  return new Promise((resolve, reject) => {
    const header: AxiosRequestHeaders = {
      "Content-Type": "application/json",
    };
    if (token) {
      console.log("token: ", token);
      const AUTH_TOKEN = `Bearer ${token}`;
      header.Authorization = AUTH_TOKEN;
    }
    const options: AxiosRequestConfig = {
      method: method,
      url: url,
      headers: header,
    };
    if (method != "GET" && body) {
      options.data = body;
    } else {
      options.params = params;
    }

    axios(options)
      .then((response) => {
        console.log("response", response.data.result);
        if (response.status === 201) {
          resolve({
            error: false,
            data: response.data.result,
            message: response.data.message,
            status: response.data.statusCode,
          });
        }
      })
      .catch(({ request, response, message }) => {
        const { status, responseText } = request;
        const newResponseText = JSON.parse(responseText);
        if (status === 401) {
          // will logout

          resolve({
            error: true,
            data: newResponseText.data,
            message: newResponseText.message,
            status,
          });

          //   showInfo(
          //     "Session is expire please do logout and login again!",
          //     "warning",
          //     "warning"
          //   );
        } else {
          resolve({
            error: true,
            data: newResponseText.data,
            message: newResponseText.message,
            status,
          });
        }
      })
      .then(() => {});
  });
};

export default Service;
