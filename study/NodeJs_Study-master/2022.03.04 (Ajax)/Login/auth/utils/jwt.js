const crypto = require('crypto')
const salt = 'ingoo'

function createToken(state){
    // JWT 필요한 필수요소 header . payload . signature 
    const header = {
        tpy:"JWT",
        alg:"HS256"
    }

    const payload = {
        ...state
    }

    const encodingHeader = encoding(header)
    const encodingPayload = encoding(payload)
    const signature = createSignature(encodingHeader,encodingPayload)

    return `${encodingHeader}.${encodingPayload}.${signature}`
}


function encoding(value){
    return Buffer.from(JSON.stringify(value))
                 .toString('base64')
                 .replace(/[=]/g,'')
}

function createSignature(header,payload){
    // encoding한 header와
    // encoding한 payload 
    // 그 값을 가지고 SHA256 만든다. salt 
    // encoding -> base64 
    const encoding = `${header}.${payload}`
    const signature = crypto.createHmac('sha256',salt)
                            .update(encoding)
                            .digest('base64')
                            .replace(/[=]/g,'')
    return signature
}

module.exports = {
    createToken,
    createSignature
}