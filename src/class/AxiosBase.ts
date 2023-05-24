import axios from 'axios'
import AxiosResponseClass from './AxiosResponseClass';

axios.defaults.withCredentials = true;
let URL: string;
export class AxiosBase
{
    constructor(url : string)
    {
        URL = url;
        axios.defaults.withCredentials = true;
        
    }
    async POST_(param: object, option?: object) {
        return await new Promise((resolve, reject) => {
            axios.post(URL, param, option)
                .then(response => {
                    resolve(
                        new AxiosResponseClass(
                            response.data,
                            response.headers,
                            response.status
                        ));
                })
                .catch((error) => {
                    reject(error);
                })
        }
        );
    }

    async POST(param: object, option?: object)
    {
        axios.interceptors.request.use(request => {
                return request
            })
        return await new Promise((resolve, reject) => {
            axios.post(URL, param, option)
                .then(response => {
                    resolve(
                        new AxiosResponseClass(
                            response.data,
                            response.headers,
                            response.status
                        ));
                })
                .catch((error) => {
                    reject(error);
                })
            }
        );
    }
    async GET()
    {
        return await new Promise((resolve, reject) => {
            axios.get(
                URL,
                {
                    responseType: 'arraybuffer'
                }
                )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                })
            }
        );
    }
}