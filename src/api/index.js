
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})



export const apiContacts = {
    async getContacts () {
        return instance.get('/contacts')
    },
    async setContact (data) {
        return instance.post('/contacts', data )
    }
}
