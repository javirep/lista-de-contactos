import axios from "axios";

class Services {
    constructor() {
        this.apiCaller = axios.create({
            baseURL: `http://localhost:4000`,
            withCredentials: true
        })
    }

    async login(email, password) {
        const response = await this.apiCaller.post("/login", { email, password })
        return response.data
    }

    async getContacts(token) {
        const response = await this.apiCaller.post("/contacts", { token })
        return response.data
    }

    async getMe() {
        const response = await this.apiCaller.get("/me")
        return response.data.isLoggedIn
    }
}

const axiosRequestFunctions = new Services()

export default axiosRequestFunctions;