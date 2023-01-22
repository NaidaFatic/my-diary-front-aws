import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export class Ajax {
    static get1() {
        // Make a request for a user with a given ID
        axios.get('/user?ID=12345')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
            }
                // always executed
            );
    }

    static getParams(params) {
        // Optionally the request above could also be done as
        axios.get('/user', {
            params: {
                ID: 12345
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    static async getAsync(api, params) {
        try {
            const response = await axios.get('https://onlinediarybackend-l8y9.onrender.com/api/' + api, params);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static post(api, params, callback) {
        axios.post('https://onlinediarybackend-l8y9.onrender.com/api/' + api, params)
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                toast(error.response.data.message);
            });
    }

    static get(api, params, callback) {
        axios.get('https://onlinediarybackend-l8y9.onrender.com/api/' + api, params)
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                toast(error.response.data.message);
                console.log(error)
            });
    }

    static put(api, params, callback) {
        axios.put('https://onlinediarybackend-l8y9.onrender.com/api/' + api, params)
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                toast(error.response.data.message);
                console.log(error)
            });
    }

    static delete(api, params, callback) {
        axios.delete('https://onlinediarybackend-l8y9.onrender.com/api/' + api, params)
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                toast(error.response.data.message);
                console.log(error)
            });
    }
}
