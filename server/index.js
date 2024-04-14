const express=require('express')
const cors=require('cors')
require('dotenv').config()
const APP_CERTIFICATE=process.env.APP_CERTIFICATE
const APP_ID=process.env.APP_ID
// console.log(APP_CERTIFICATE);
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole} = require('agora-token')
const PORT=8000

const app=express()
app.use(cors({ origin: '*' }));

 const generateToken=async (req,res)=>{

    const channelName=req.query.channelName

    const uid=req.query.uid
    // console.log(channelName,uid);
    const role = RtcRole.PUBLISHER;
    // const role1=RtmRole.PUBLISHER

  const expirationTimeInSeconds = 3600

  const currentTimestamp = Math.floor(Date.now() / 1000)
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds


    const token= RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        uid,
        role,
        expirationTimeInSeconds,
        privilegeExpiredTs)
    
    const token1=RtmTokenBuilder.buildToken(APP_ID, APP_CERTIFICATE, uid)
    // console.log(token1);



    res.status(201).json({"rtcToken":token,"rtmToken":token1})



}

app.get('/access_token',generateToken)

app.listen(PORT,()=>{
    console.log('Server is running on port 8000');
})