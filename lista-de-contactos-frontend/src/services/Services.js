import axios from "axios";

class Services {
    constructor() {
        this.apiCaller = axios.create({
            baseURL: `http://localhost:4000`,
            withCredentials: true
        })
    }

    async login(email, password, rememberMe) {
        const response = await this.apiCaller.post("/login", { email, password, rememberMe })
        
        return response.data
    }

    async getAuth(token){
        const response = await this.apiCaller.get("/verifyAuth", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }

    async getContacts(token) {
        const response = await this.apiCaller.get("/contacts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        response.data.contacts[2] = null
        console.log(response.data)
        return response.data
    }
}

const axiosRequestFunctions = new Services()

export default axiosRequestFunctions;