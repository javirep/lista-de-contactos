import axios from "axios";

class Services {
    constructor() {
        this.apiCaller = axios.create({
            baseURL: `http://localhost:4000`
        })
    }

    async login(email, password) {
        const response = await this.apiCaller.post("/login", { email, password })
        return response.data
    }

    async getContacts() {
        const response = await this.apiCaller.get("/contacts")
        return response.data
    }
}

const axiosRequestFunctions = new Services()

export default axiosRequestFunctions;