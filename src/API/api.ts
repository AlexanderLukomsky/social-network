import { instance } from "./instance"

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    getUserProfile(userId: string) {
        return ProfileAPI.getUserProfile(userId)
    },
    follow(userID: number) {
        return instance.post(`follow/${userID}`)
    },
    unFollow(userID: number) {
        return instance.delete(`follow/${userID}`)
    }
}
export const authAPI = {
    me() {
        return instance.get('auth/me')

    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post('auth/login', { email, password, rememberMe })
    },
    logout() {
        return instance.delete('auth/login')
    },
}
export const ProfileAPI = {
    getUserProfile(userId: string) {
        return instance.get(`${userId ? userId : '19615'}`)
    },
    getStatus(userID: string) {
        return instance.get(`status/${userID}`)
    },
    updateStatus(status: string) {
        return instance.put<{
            resultCode: number
            messages: string[],
            data: {}
        }>(`status`, { status })
    }
}