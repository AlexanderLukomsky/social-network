import { instance } from "./instance"

export const authAPI = {
   me() {
      return instance.get('auth/me')
   },
   login(email: string, password: string, rememberMe: boolean = true) {
      return instance.post('auth/login', { email, password, rememberMe })
   },
   logout() {
      return instance.delete('auth/login')
   },
}