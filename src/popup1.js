const profiles = document.querySelector('header ul li#profiles'); 
const release = document.querySelector('header ul li#release');
const settings = document.querySelector('header ul li#settings');
const time = document.querySelector('.checkoutTime form button');
const saveCheckout = document.querySelector('.item .buttons #saveCheckout');
const exportBtn = document.querySelector('.export button');
const importBtn = document.querySelector('.import button');
const webhook = document.querySelector('.webhook button')

// listen button and show/hide tabs
profiles.addEventListener('click', () => {showTab('profiles')});
release.addEventListener('click', () => {showTab('release')});
settings.addEventListener('click', () => {showTab('settings')});

time.addEventListener('click', () => { 
    let arrTime = this.time.value.split(':'); setCheckoutTime(arrTime[0], arrTime[1], arrTime[2], arrTime[3]);
    outputSettedTime(); 
});
saveCheckout.addEventListener('click', () => {
    setRelease(this.checkoutLink.value, this.size.value);
    outputCheckoutLink();
})
webhook.addEventListener('click', () =>{
    setWebhook(this.webhook.value);
    outputWebhook();
})
exportBtn.addEventListener('click', () => {
    if (exportData()) console.log('export');
    else console.log('noExport');
})
importBtn.addEventListener('click', () =>{
    if (importData(JSON.parse(this.import.value)))
        console.log('import');
    else console.log('noImport');
})


function checkAccess(){
    let answere;
    chrome.storage.local.get('license_key', async (res)=>{ 
        answere = await checkKey(res.license_key);
        if ( !answere.error && !answere.license){
            chrome.storage.local.clear(() => { window.location.href = './auth.html' })
        }else 
        if( answere.error ){
            console.log('Internet problem')
        }
    })
}

function outputSettedTime(){
    chrome.storage.local.get( 'time', (res) => {
        this.settedTime.innerHTML = `${res.time.hours}:${res.time.minutes}:${res.time.seconds}:${res.time.milliseconds}`;
    })
}

function outputCheckoutLink(){
    chrome.storage.local.get( 'checkout', (res) => {
        if (res.checkout.link){
            this.checkout.href = res.checkout.link;
            this.checkoutLink.value = res.checkout.link;
            this.size.value = res.checkout.size;
        }
    })
}

function outputWebhook(){
    chrome.storage.local.get( 'webhook', (res) => {
        if (res.webhook)
            this.webhook.value = res.webhook;
    })
}

function outputAll(){
    outputSettedTime();
    outputCheckoutLink();
    outputWebhook();
}

checkAccess();
outputAll();
