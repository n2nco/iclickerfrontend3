
import axios from 'axios'
import store from './Store'

import { decompressFromUTF16 } from 'lz-string'
//dotenv not needed it seems - ensure react_app env vars are passed in on docker
// import dotenv from 'dotenv'
// dotenv.config()

const qs = require('qs')
const assert = require('assert')

axios.defaults.headers.common = {
    "Content-Type": "application/json"
}

export const createPaymentIntent = async (values, storeState) => {
    try {
        //combine latest form values with store.state!
        let storeStateWformValues = Object.assign(storeState, values)

        let apiUrl
        console.log('logging process.env from createPaymentIntent:')
        console.log(process.env)
        process.env.REACT_APP_ENV === 'development' ? apiUrl = process.env.REACT_APP_API_URL_DEVELOPMENT : apiUrl = process.env.REACT_APP_API_URL_PRODUCTION
        
        console.log('process.env.REACT_APP_API_URL_PRODUCTION is: (might not be in use)' + process.env.REACT_APP_API_URL_PRODUCTION)
        console.log('sending api req to ' + apiUrl)
        let res = await axios.post(`${apiUrl}/create-payment-intent`, storeStateWformValues)
        let metadata = res.data.paymentIntent.metadata.jsonState
        let orderState
        try {
            let metadataDecompressed16 = decompressFromUTF16(metadata)
            orderState = JSON.parse(metadataDecompressed16)

        }catch(e){
            console.log('error decompressing metadata')
            console.log(e)
        }
        // let metadataDecompressed = decompress(metadata) //LZString decompress
        // let orderState = JSON.parse(metadataDecompressed)
        orderState.clientSecret = res.data.clientSecret
      
        orderState.paymentIntent = res.data.paymentIntent


        console.log('/create-payment-intent response: - this is orderState updated from paymentIntent object')
        console.log(orderState)
        return orderState
    } catch (error) {
        console.log('error in createPaymentIntent - api.js:')
        window.e = error
        console.log(error)
        setTimeout( () => console.log('/create-payment-intent error - server may be offline - or user re-submitted ' + JSON.stringify(window.e), 2000))
        return false
    }
}


