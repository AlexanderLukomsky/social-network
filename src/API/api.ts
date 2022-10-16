import axios from "axios";

export const usersAPI = {
    _instance: axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "1b228bfc-8734-47cb-b840-f8cc669c3e6c"
        }
    }),
    getUsers(currentPage: number = 1, pageSize: number = 5) {
        return this._instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    getUserProfile(userId: string) {
        return ProfileAPI.getUserProfile(userId)
    },
    follow(userID: number) {
        return this._instance.post(`follow/${userID}`)
            .then(response => response.data)
    },
    unFollow(userID: number) {
        return this._instance.delete(`follow/${userID}`)
            .then(response => response.data)
    }
}
export const authAPI = {
    _instance: axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "1b228bfc-8734-47cb-b840-f8cc669c3e6c"
        }
    }),
    me() {
        return this._instance.get('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return this._instance.post('auth/login', { email, password, rememberMe })
    },
    logout() {
        return this._instance.delete('auth/login')
    },
}
export const ProfileAPI = {
    _instance: axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/profile/',
        headers: {
            "API-KEY": "1b228bfc-8734-47cb-b840-f8cc669c3e6c"
        }
    }),
    getUserProfile(userId: string) {
        return this._instance.get(`${userId ? userId : '19615'}`)
            .then(response => response.data)
    },
    getStatus(userID: string) {
        return this._instance.get(`status/${userID}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return this._instance.put<{
            resultCode: number
            messages: string[],
            data: {}
        }>(`status`, { status })
            .then(response => {
                return response.data
            })
    }
}