// made by Gaspromov & Cactus-web

 
const ids = [                                                                         // id полей, которые нужно заполнить
    'firstName', 'middleName', 'lastName', 'addressLine1',
    'addressLine2', 'city', 'region', 'postCode', 'phone', 'email',                 //continue
    'cardNumber-input', 'cardExpiry-input', 'cardCvc-input'                         //continue
]


const paramDispatch = {bubbles: true}; 
let currentInput;                                                                   // current Input for setting Value
let continueButton;                                                                 // current button for next step to filling
let newCardIframe;
 

function setCurrentInput(id){                                                       // set current input by id
    if (id !== 'phone')
        currentInput = document.getElementById(id);
    else 
        currentInput = document.querySelector('#phone input');
}


function focus(elem){                                                               // focus to input
    if (elem)
        elem.focus();
}

function setValue(elem, value){                                                     // setting value for input
    if (elem && value)
        elem.value = value;
}
 
function dispatchEventFor(elem, param){                                             // do some event with input
    if (elem)
        elem.dispatchEvent(new Event( param, this.paramDispatch ))
}

function blur(elem){                                                                // blur or unfocus to input
    if (elem)
        elem.blur()
}


function setValueInput(value){                                                      // all for good setting value to input

    focus(currentInput);
    // setTimeout(dispatchEventFor, 500, currentInput, 'keydown')
    setTimeout(() => {
        dispatchEventFor(currentInput, 'keydown')
        setValue(currentInput, value);
        dispatchEventFor(currentInput, 'change');                                       // event on change smth
        dispatchEventFor(currentInput, 'input');                                        // event on input
    }, 500);
    setTimeout(blur, 1000, currentInput);
}

async function doFilling(start, end, profile){                                                     // filling inputs from start to end input
    for (let i=start; i <= end; i++){
            if (i !=5 && i !=6)
                setTimeout(() => {
                    setCurrentInput(ids[i]);
                    setValueInput(profile[i])
                }, i*1500);
            else{
                setCurrentInput(ids[i]);
                setValueInput(profile[i])
            }
    }
}
 
function clickContinue(){                                                           // clicking continue for new step to filling
    if (document.querySelector('button.button-continue')){
        continueButton = document.querySelector('button.button-continue');
        continueButton.click();
    }
}
 
function setNewCard(){                                                              // setting new card
    if (document.querySelector('div.new-card-link'))
        document.querySelector('div.new-card-link').click()
}

// function iframeInputs(){
//     newCardIframe = document.querySelector(`iframe.newCard`).contentWindow.document;
// }

function clickCheckBox(){
    document.querySelector('span.checkmark').click()
}
 
 
 function doFillingAll(profile){
    setTimeout(doFilling, 3000, 0, 9, profile);
    setTimeout(clickContinue, 18000)
     
    setTimeout( setNewCard, 20000);
    setTimeout(doFilling, 24000, 10, 12, profile);
    setTimeout(clickContinue, 28000);

    setTimeout(clickCheckBox, 31000)
 }

 function check(profile){
     if (document.getElementById('firstName')) doFillingAll(profile);
     else timeOutCheck(profile);
 }
 
 function timeOutCheck(profile){
     setTimeout(check, 50, profile);
 }


 function doFillingIframe(profile){
    setTimeout(doFilling, 6500, 10, 12, profile);
 }

 function checkIframe(profile){
     if (document.getElementById('cardNumber-input')) doFillingIframe(profile);
     else timeOutCheckIframe(profile);
 }

 function timeOutCheckIframe(profile){
     setTimeout(checkIframe, 100, profile)
 }
 
function doCheck(h, m, s, ms){
    now = new Date();
    try{
    if (now.getHours() == h && now.getMinutes() == m && now.getSeconds() == s && now.getMilliseconds() >= ms || now.getHours() > h){
        console.log(now.getSeconds(), ':', now.getMilliseconds())
        document.querySelector("div.buttonContainer > button.button-submit").click();
    }else if (now.getHours() == h && now.getMinutes() == m && now.getSeconds() > (s-2)){
        timeout(10, h, m, s, ms);
    }else {
        timeout(500, h, m, s, ms);
    }
    }
    catch {}
 
}
    
function timeout(t, h, m, s, ms){
    setTimeout(doCheck, t, h, m, s, ms)
}
    

 function start(profile){
    timeOutCheck(profile);
    timeOutCheckIframe(profile);
 }

 try{
    chrome.storage.local.get( 'currentProfile', (result) => {
        let currentProfile = result.currentProfile;
        if (currentProfile != '' && currentProfile != null){
           chrome.storage.local.get ( currentProfile, async (result) => {
               currentProfile = await result[currentProfile];
               let curr = [currentProfile.firstName, currentProfile.middleName, currentProfile.lastName, currentProfile.addressLine1,
                   currentProfile.addressLine2, currentProfile.city, currentProfile.region, currentProfile.postCode, currentProfile.phone, currentProfile.email,
                   currentProfile.cardNumber, currentProfile.cardExpiry, currentProfile.cardCvc
               ]
               start(curr);
           })
       }
    })
 }
 catch{
 }

 try{
    chrome.storage.local.get( 'time', (result) => {
        console.log(result, result.time)
            let h = result.time.hours;
            let m = result.time.minutes;
            let s = result.time.seconds;
            let ms = result.time.milliseconds;
            doCheck(h, m, s, ms);
    } )
 }
 catch{}


