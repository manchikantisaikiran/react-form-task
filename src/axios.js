import axios from 'axios'

const instance = axios.create({
    baseURL:'http://react-form-exercise.herokuapp.com/'
})
// react-form-exercise.herokuapp.com

export default instance