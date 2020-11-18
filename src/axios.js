import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:5000/'
})
// react-form-exercise.herokuapp.com

export default instance