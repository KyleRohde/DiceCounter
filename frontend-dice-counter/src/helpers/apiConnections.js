import axios from 'axios';

export async function dbGet(endpoint){
    try {
        const instance = axios.create({baseURL:'https://localhost:5001/api'});
        const response = await instance.get(endpoint);
        return response;
    } catch(e) {
        console.log(e);
    }
}

export async function dbPost(endpoint, payload){
    try {
        const instance = axios.create({baseURL:'https://localhost:5001/api'});
        await instance.post(endpoint, payload);
    } catch(e) {
        console.log(e);
    }
}

export async function dbPut(endpoint, payload){
    try {
        const instance = axios.create({baseURL:'https://localhost:5001/api'});
        await instance.put(endpoint, payload);
    } catch(e) {
        console.log(e);
    }
}