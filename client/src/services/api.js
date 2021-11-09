import axios from 'axios';
import { TOKEN_KEY } from '../utils/constants';

const url = `http://localhost:5000`;

const token = localStorage.getItem(TOKEN_KEY);

export default axios.create({
    headers: {
        authorization: token,
    },
    baseURL: url,
});


export const keys = {
    auth: '/auth',
    projects: '/projects',
    tasks: '/tasks',
    lists: '/lists',
}