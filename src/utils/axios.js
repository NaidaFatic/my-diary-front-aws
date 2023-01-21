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
            const response = await axios.get('http://onlinediarybackend1-env.eba-jcdedauh.eu-central-1.elasticbeanstalk.com/api/' + api, params);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static post(api, params, callback) {
        axios.post('http://onlinediarybackend1-env.eba-jcdedauh.eu-central-1.elasticbeanstalk.com/api/' + api, params)
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                toast(error.response.data.message);
            });
    }

    static get(api, params, callback) {
        axios.get('http://onlinediarybackend1-env.eba-jcdedauh.eu-central-1.elasticbeanstalk.com/api/' + api, params)
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                toast(error.response.data.message);
                console.log(error)
            });
    }

    static put(api, params, callback) {
        axios.put('http://onlinediarybackend1-env.eba-jcdedauh.eu-central-1.elasticbeanstalk.com/api/' + api, params)
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                toast(error.response.data.message);
                console.log(error)
            });
    }

    static delete(api, params, callback) {
        axios.delete('http://onlinediarybackend1-env.eba-jcdedauh.eu-central-1.elasticbeanstalk.com/api/' + api, params)
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                toast(error.response.data.message);
                console.log(error)
            });
    }
}
