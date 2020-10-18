const url = "https://quasarcook.com/api/v1/licenses/check";

function maskKey(input, maxLength){
    let newStr = '';
    let value = input.value.split('-').join('');
    let length = 0;
    maxLength > value.length ? length = value.length : length = maxLength;
    console.log(length)
      for (let i = 0; i < length; i++){
      newStr += value[i];
      if ( (i+1) % 4 == 0 && i != 0 && i+1 != length){
        newStr += '-';
      }
    }
    input.value = newStr;
    return;
}

function showTab(idTab){
  hideTab();
  document.querySelector(`section#${idTab}`).classList.add("active");
  document.querySelector(`header ul li#${idTab}`).classList.add("active");
}

function hideTab(){
  document.querySelector(`section.active`).classList.remove("active");
  document.querySelector(`header ul li.active`).classList.remove('active');
}

async function checkKey(key){
  let returnParam;
    await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({key: key})
    })
    .then( async (w) => { 
      if (w.status == 200)
        returnParam = {license: true, error: false};
      else
      if (w.status == 400)
        returnParam = {license: false, error: false};
      else
        returnParam = {license: null, error: true};
    })
    .catch( () => { returnParam = {license: null, error: true} })
  return returnParam;
}

function importData(value){
  try{
    chrome.storage.local.set(value, () => {
      // setOptionOfSelect()
      // outputCurrentProfile();
    });
    return true;
  }
  catch{
    return false;
  }
}

function exportData(){
  try{
    chrome.storage.local.get( null, (result) => {
      this.dataExport.value = JSON.stringify(result);
      this.dataExport.select();
      document.execCommand("copy");
    })
    return true;
  }
  catch{
    return false;
  }
}

function setCheckoutTime(hours, minutes, seconds, milliseconds){
  chrome.storage.local.remove('time', () => {})
  chrome.storage.local.set( {
    'time': {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds 
    }
  })
}

function setRelease(link, size){
  chrome.storage.local.remove('checkout', () => {})
  chrome.storage.local.set( {
    'checkout': {
      link: link,
      size: size
    }
  })
}

function setWebhook(link){
  chrome.storage.local.remove('webhook', () => {})
  chrome.storage.local.set( {
    'webhook': link
  })
}