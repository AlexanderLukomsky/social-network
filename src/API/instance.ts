import axios from 'axios';
export const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {
      "API-KEY": "7de88f8c-150d-4267-b894-d856d64ffc1a"
   }
})