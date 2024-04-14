let createform = document.getElementById('lobby__form__create')
let joinform = document.getElementById('lobby__form__join')
const server="localhost:5502"

// let displayName = sessionStorage.getItem('display_name')
// if(displayName){
//     form.name.value = displayName
// }
const secretKey = 'supersecretkey';
// Encrypt data
// async function encryptData(data, secretKey) {
//     try{
//     const encrypted = await CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//     return encodeURIComponent(encrypted); // Encode for URL
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }

const queryString1 = window.location.search;
const urlParams1 = new URLSearchParams(queryString1);
let roomId1 = urlParams1.get("room");
console.log(roomId1);
if(roomId1)
{
    joinform.room.value=roomId1
}

// Decrypt data
async function decryptData(encryptedData, secretKey) {
    
    const decrypted = await CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}


// document.getElementById('form__container__create').style.display='block'
// document.getElementById('form__container__join').style.display='none'

document.getElementById("create__room__btn").addEventListener('click',()=>{
    document.getElementById('form__container__create').style.display='block'
    document.getElementById('form__container__join').style.display='none'
    
document.getElementById("create__room__btn").classList.add('active')
document.getElementById("join__room__btn").classList.remove('active')

})

document.getElementById("join__room__btn").addEventListener('click',()=>{
    document.getElementById('form__container__create').style.display='none'
    document.getElementById('form__container__join').style.display='block'
        
document.getElementById("create__room__btn").classList.remove('active')
document.getElementById("join__room__btn").classList.add('active')
})


const copyBtns = document.getElementsByClassName('copyBtn');

// copyBtn.addEventListener('click', () => {
//     const textToCopy = ''; // Replace with your pre-defined text
//     copyToClipboard(textToCopy);
//     alert('Text copied to clipboard: ' + textToCopy);
// });

createform.addEventListener('submit', async (e) => {
    e.preventDefault()

    sessionStorage.setItem('display_name', e.target.name.value)

    let inviteCode = e.target.room.value
    // if(!inviteCode){
    //     inviteCode = String(Math.floor(Math.random() * 10000))
    // }
    // const url=`${server}room.html?room=${await encryptData(inviteCode,secretKey)}`
    // console.log(url);
    // for (const copyBtn of copyBtns) {
    // copyBtn.addEventListener('click', () => {
    //     const textToCopy = url; // Replace with your pre-defined text
    //     copyToClipboard(textToCopy);
    //     alert('Text copied to clipboard: ' + textToCopy);
    // });
// }
 
    window.location = `room.html?room=${inviteCode}`
})

joinform.addEventListener('submit', async (e) => {
    e.preventDefault()

    sessionStorage.setItem('display_name', e.target.name.value)

    let encryptdata = e.target.room.value
    // if(!inviteCode){
    //     inviteCode = String(Math.floor(Math.random() * 10000))
    // }
    // const urlParams = new URLSearchParams(inviteCode);
    // const encryptdata = inviteCode.split('room=')[1];
    // console.log(encryptdata); 
    if(!encryptdata)
    {
        console.log('Please provide correct link');
    }
    const data=await decryptData(encryptdata,secretKey)
    // console.log(data);
    // for (const copyBtn of copyBtns) {
    //     copyBtn.diabled=true
    // }
    window.location = `room.html?room=${data}`
})