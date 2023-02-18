import axios from "axios";

// const instance = axios.create({
//     baseURL: process.env.REACT_API_URL
// })

const instance = axios.create({
    baseURL: "http://localhost:5000"
})

export default instance; 