const sendKey = document.getElementById('auth');
const url = "https://quasarcook.com/api/v1/licenses/check"

sendKey.addEventListener( 'click', () =>{
    auth();
})

async function auth(){
  await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: this.key.value
  })
  .then( (w) => { console.log(w)
    window.location.href = "./popup1.html";
  })
  .catch( (e) => 
    window.location.href = "./popup1.html"
  )
}

this.key.addEventListener('keyup', () => {
  maskKey(this.key, 16)
})


