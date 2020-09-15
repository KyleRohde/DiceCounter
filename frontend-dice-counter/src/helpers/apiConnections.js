import axios from 'axios';

export async function dbGet(endpoint){
    const instance = axios.create({baseURL:'https://localhost:5001/api'});
    const response = await instance.get(endpoint);
    return response;
}

export async function dbPost(endpoint, payload){
    const instance = axios.create({baseURL:'https://localhost:5001/api'});
    await instance.post(endpoint, payload);
}

export async function dbPut(endpoint, payload){
    const instance = axios.create({baseURL:'https://localhost:5001/api'});
    await instance.put(endpoint, payload);
}