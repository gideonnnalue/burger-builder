import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-app-react.firebaseio.com/'
});

export default instance;