const sendKey = document.getElementById('auth');

async function auth(){
  answere = await checkKey(this.key.value);
  if ( !answere.error && answere.license){
      await chrome.storage.local.set({license_key: this.key.value})
      window.location.href = './popup1.html';
  }else{
    console.log('Some problem');
  }
}

sendKey.addEventListener( 'click', () =>{
    auth();
})

this.key.addEventListener('keyup', () => {
  mask(this.key, 16, 'a0', '-', 4)
})



// await fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({key: this.key.value})
// })
// .then( async (w) => { 
// if (w.status == 200){
// }
// })