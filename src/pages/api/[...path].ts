/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import httpProxy from "http-proxy";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // The actual URL of your API

const proxy = httpProxy.createProxyServer();

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false
  }
};

console.log("API_URL", API_URL);

export default (req: any, res: any) => {
  return new Promise<void>((resolve, reject) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true }, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
