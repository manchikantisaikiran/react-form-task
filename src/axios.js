import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-form-exercise.herokuapp.com/'
})

export default instance