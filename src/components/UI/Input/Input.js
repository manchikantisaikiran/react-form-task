import React from 'react'
import classes from './input.module.css'

const Input = (props) => {
    // console.log(props)
    return (
        <input onChange={props.change} className={classes.input} {...props.config} />
    )
}

export default Input