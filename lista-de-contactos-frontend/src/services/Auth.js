import React from 'react'
import axiosRequestFunctions from "../services/Services"

export default async function Auth(WrappedComponent) {
    return await axiosRequestFunctions.getMe()
}
