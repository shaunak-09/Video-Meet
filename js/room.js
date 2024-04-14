// let messagesContainer = document.getElementById('messages');
// messagesContainer.scrollTop = messagesContainer.scrollHeight;

const memberContainer = document.getElementById('members__container');
const memberButton = document.getElementById('members__button');

const chatContainer = document.getElementById('messages__container');
const chatButton = document.getElementById('chat__button');

let activeMemberContainer = false;

const server="https://videomeet09.netlify.app"
// const server="localhost:5502/index.html"

// let displayName = sessionStorage.getItem('display_name')
// if(displayName){
//     form.name.value = displayName
// }
const secretKey = 'supersecretkey';
// Encrypt data
async function encryptData(data, secretKey) {
    try{
    const encrypted = await CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encodeURIComponent(encrypted); // Encode for URL
    }
    catch(err)
    {
        console.log(err);
    }
}

// Decrypt data
// async function decryptData(encryptedData, secretKey) {
    
//     const decrypted = await CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), secretKey).toString(CryptoJS.enc.Utf8);
//     return JSON.parse(decrypted);
// }
// const queryString1 = window.location.search;
// const urlParams1 = new URLSearchParams(queryString1);
// let roomId1 = urlParams1.get("room");
// // console.log(roomId1);

const copyBtn = document.getElementById('copyBtn');

function copyToClipboard(text) {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.style.position = 'fixed';
  textarea.style.opacity = 0;
  textarea.value = text;
  document.body.appendChild(textarea);

  // Select the text in the textarea element
  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile devices

  // Copy the selected text to the clipboard
  document.execCommand('copy');

  // Remove the temporary textarea element
  document.body.removeChild(textarea);
}

    
    
    copyBtn.addEventListener('click', async () => {
      const url=`${server}?room=${await encryptData(roomId,secretKey)}`
      console.log(url);
        const textToCopy = url; // Replace with your pre-defined text
        copyToClipboard(textToCopy);
        alert('Text copied to clipboard: ' + textToCopy);
    });
  

memberButton.addEventListener('click', () => {
  if (activeMemberContainer) {
    memberContainer.style.display = 'none';
  } else {
    memberContainer.style.display = 'block';
  }

  activeMemberContainer = !activeMemberContainer;
});

let activeChatContainer = false;

chatButton.addEventListener('click', () => {
  if (activeChatContainer) {
    chatContainer.style.display = 'none';
  } else {
    chatContainer.style.display = 'block';
  }

  activeChatContainer = !activeChatContainer;
});

let displayFrame = document.getElementById('stream__box')
let videoFrames = document.getElementsByClassName('video__container')
let userIdInDisplayFrame = null;

let expandVideoFrame = (e) => {

  let child = displayFrame.children[0]
  if(child){
      document.getElementById('streams__container').appendChild(child)
  }

  displayFrame.style.display = 'block'
  displayFrame.appendChild(e.currentTarget)
  userIdInDisplayFrame = e.currentTarget.id
  // console.log(videoFrames);

  for(let i = 0; videoFrames.length > i; i++){
    if(videoFrames[i].id != userIdInDisplayFrame){
      videoFrames[i].style.height = '100px'
      videoFrames[i].style.width = '100px'
    }
  }

}

for(let i = 0; videoFrames.length > i; i++){
  videoFrames[i].addEventListener('click', expandVideoFrame)
}


let hideDisplayFrame = () => {
    userIdInDisplayFrame = null
    displayFrame.style.display = null

    let child = displayFrame.children[0]
    document.getElementById('streams__container').appendChild(child)

    for(let i = 0; videoFrames.length > i; i++){
      videoFrames[i].style.height = '300px'
      videoFrames[i].style.width = '300px'
  }
}

displayFrame.addEventListener('click', hideDisplayFrame)
// window.expandVideoFrame=expandVideoFrame
// export {expandVideoFrame}