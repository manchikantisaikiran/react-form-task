import React from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './UserData.module.css'
import axios from '../../axios'

class UserData extends React.Component {

    state = {
        formData: {
            FirstName: {
                config: {
                    type: 'text',
                    name: 'FirstName',
                    placeholder: 'Your First Name',
                },
                value: ''
            },
            LastName: {
                config: {
                    type: 'text',
                    name: 'LastName',
                    placeholder: 'Your Last Name',
                },
                value: ''
            },
            email: {
                config: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Your Mail id',
                },
                value: ''
            },
            phoneNum: {
                config: {
                    type: 'number',
                    name: 'phoneNum',
                    placeholder: 'Your Phone Number',
                },
                value: ''
            },
            userImage: {
                config: {
                    type: 'file',
                    name: 'userImage',
                    placeholder: 'upload profile',
                },
                value: ''
            },
        },
        response: [],
        responseClass: '',
        disabled: false
    }

    saveUser = (e) => {
        e.preventDefault()
        this.setState({ response: ['fetching data...'], responseClass: '', disabled: true })
        const data = {
            FirstName: this.state.formData.FirstName.value,
            LastName: this.state.formData.LastName.value,
            email: this.state.formData.email.value,
            phoneNum: this.state.formData.phoneNum.value,
            userImage: this.state.formData.userImage.value
        }

        const fd = new FormData()

        for (let key in data) {
            fd.append(key, data[key])
        }

        axios.post('/users/save', fd, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            }
        }).then(res => {
            let errors = []
            console.log(res, 'then')
            if (res.data.message)
                this.setState({
                    response: [res.data.message],
                    responseClass: 'success',
                    disabled: false
                })
            else if (res.data.error) {
                for (let key in res.data.error) {
                    errors.push(res.data.error[key])
                }
                console.log(errors)
                this.setState({ response: errors, responseClass: 'danger', disabled: false })
            }
        }).catch(e => {
            console.log(e, 'catch')
            this.setState({ response: ['Network Issue'], disabled: false })
        })
    }

    inputChangedHandler = (e) => {

        const formData = {
            ...this.state.formData
        }

        const updatedInput = {
            ...formData[e.target.name]
        }

        if (e.target.name === 'userImage') {
            updatedInput.value = e.target.files[0]
            formData[e.target.name] = updatedInput
        } else {
            updatedInput.value = e.target.value
            formData[e.target.name] = updatedInput
        }

        this.setState({ formData, response: [''] })
    }

    render() {

        let status = this.state.response

        const inputElement = []

        for (let key in this.state.formData) {
            inputElement.push({
                id: key,
                config: this.state.formData[key]
            })
        }

        let form = (
            <form>
                {inputElement.map(obj => (<Input
                    key={obj.id}
                    config={obj.config.config}
                    change={(event) => this.inputChangedHandler(event)}
                />
                ))}
                {<p className={[classes.response, classes[this.state.responseClass]].join(' ')}>
                    {status.map(item=>(<div>{item}</div>))}</p>}
                <Button disabled={this.state.disabled} click={this.saveUser}>Submit</Button>
            </form>)

        return (
            <div className={classes.UserData}>
                <h3>Tell us about yourself</h3>
                {form}
            </div>
        )
    }
}

export default UserData