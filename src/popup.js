const nextBtn = document.querySelector(`#nextBtn`);
const prevBtn = document.querySelector(`#prevBtn`);
const addingTab = document.querySelector(`#addingTab`);
const profilesTab = document.querySelector(`#profilesTab`);
const timeTab = document.querySelector(`#timeTab`);
const dataTab = document.querySelector(`#dataTab`);
const close_modal = document.querySelector(`#close-modal`);
const choosingProfile = document.querySelector(`#chooseProfile`);
const deletingProfile = document.querySelector(`#deleteProfile`);
const settingTime = document.querySelector(`#setTime`);
const exportBtn = document.querySelector(`#export`);
const importBtn = document.querySelector(`#import`);
const themeSwitch = document.querySelector(`#theme`);
let tabs = document.querySelectorAll(`.tab`);
let currentTab = 0;

let formAdd = document.querySelector(`#formAdding`);
let formTime = document.querySelector(`#settingTime`)
let steps = document.querySelectorAll(`.step`);
let currentStep = 0; 

let tabsBtn = document.querySelector('div.tabsBtn');


const showStep = (stepsNumber) => {
  this.steps = steps;
  this.steps[stepsNumber].style.display = "grid";
  
  stepsNumber === 0 ? hide(prevBtn) : show(prevBtn);
  stepsNumber === (this.steps.length - 1) ? changeText(nextBtn, `Set Profile`) : changeText(nextBtn, `Continue`);
}

const hide = (element) => {
  element.style.display = `none`;
}

const show = (element) => {
  element.style.display = `inline`;
}


const changeText = (element, text) => {
  element.innerHTML = text;
}

const nextStep = () => {
  if (validateStep(steps[currentStep])){
    hide(steps[currentStep]);
    currentStep++;
    if (currentStep > (steps.length - 1)) {
      currentStep = steps.length - 1;
      setProfile(formAdd);
      
    }

    showStep(currentStep);
  }else{
    return false;
  }
}

prevStep = () => {
  hide(steps[currentStep]);
  currentStep--;
  if (currentStep < 0) {
    currentStep = 0;
  }

  showStep(currentStep);
}

const setChecked = () => {
  chrome.storage.local.get('themeLigthDark', (res) => {
    if (res.themeLigthDark == null){
      chrome.storage.local.set( {themeLigthDark: 'light'})
    }else if (res.themeLigthDark == 'dark'){
      document.querySelector('#theme input').setAttribute('checked', 'checked');
      document.querySelector(`body`).classList.remove('light');
    }else{
      document.querySelector(`body`).classList.add('light');
    }
  })
}

const setNewTheme = () => {
  chrome.storage.local.get('themeLigthDark', (res) => {
    if (res.themeLigthDark == 'light'){
      chrome.storage.local.set( {themeLigthDark: 'dark'});
      document.querySelector(`body`).classList.remove('light');
    }else{
      chrome.storage.local.set( {themeLigthDark: 'light'});
      document.querySelector(`body`).classList.add('light');
    }
  })
}

nextBtn.addEventListener('click', () => {
  nextStep(1);
});
prevBtn.addEventListener('click', () => {
  prevStep(1);
});

themeSwitch.addEventListener( 'click', () =>{
  setNewTheme();
} )

const validateStep = (step) => {
    let inputs = step.getElementsByTagName("input")
    let valid = true;

    if(currentStep == (steps.length-1) && !document.querySelector(`input#profileName`).checkValidity()){
      valid = false;
      document.querySelector(`input#profileName`).className += " invalid";
    }

    for (let i = 0; i < inputs.length; i++){
        if (!inputs[i].checkValidity()){
            inputs[i].className += " invalid";
            valid = false;
        }else {
            inputs[i].className -= " invalid";
            continue;
        }
    }
    return valid;
}


addingTab.addEventListener('click', () => {
  nextTab(0);
});
profilesTab.addEventListener('click', () => {
  nextTab(1);
});
timeTab.addEventListener('click', () => {
  nextTab(2);
});
dataTab.addEventListener('click', () => {
  nextTab(3);
});

const showTab = (tubNumber) => {
  this.tabs = tabs;

  this.tabs[tubNumber].style.display = "block";
  document.querySelectorAll('.tabBtn')[tubNumber].className += " active"
}

const nextTab = (n) => {
  
    document.querySelectorAll('.tabBtn')[currentTab].classList.remove("active")
    hide(tabs[currentTab]);
    currentTab = n;
    showTab(currentTab);
}

const showModal = () => {
  document.querySelector('.modal').style.display = "grid";
}

const hideModal = () => {
  document.querySelector('.modal').style.display = "none";
}

close_modal.addEventListener( 'click', () => {
  hideModal()
} )

const makeNormDate = (str) =>{
  str =str.split('');
  str = str[0] + str[1] + ' / ' + str[2] + str[3];
  return str;
}


const setProfile = (form) => {
  inputs = form.querySelectorAll('input');
  selets = form.querySelectorAll('select');
  let nameProfile = String(inputs[0].value);
  chrome.storage.local.remove(nameProfile, () => {})
  chrome.storage.local.set({
    [nameProfile]: {
    firstName: (inputs[1].value).trim(),
    lastName: (inputs[2].value).trim(),
    middleName: inputs[3].value.trim(),
    addressLine1: inputs[4].value,
    addressLine2: inputs[5].value,
    city: inputs[6].value,
    region: selets[0].value,
    postCode: inputs[7].value.replace(/[^0-9]/gim,''),
    phone: inputs[8].value.replace(/[^0-9]/gim,''),
    email: inputs[9].value,
    cardNumber: inputs[10].value.replace(/[^0-9]/gim,''),
    cardExpiry: makeNormDate(inputs[11].value.replace(/[^0-9]/gim,'')),
    cardCvc: inputs[12].value.replace(/[^0-9]/gim,'')
  }})
  showModal();
  setOptionOfSelect();
}

function setOptionOfSelect(){
  chrome.storage.local.get(null, (items) => {
    document.querySelector(`select#profiles`).innerHTML = '';
    var allKeys = Object.keys(items);
    if (allKeys != '' && allKeys != null)
      for ( key of allKeys){
        if (key != 'currentProfile' && key != 'time' && key != 'themeLigthDark')
          document.querySelector(`select#profiles`).innerHTML += `<option value="${key}">${key}</option>`
      }
    else 
      document.querySelector(`select#profiles`).innerHTML = `<option value="">Нет профилей</option>`;
  });
}

function outputCurrentTime(){
  chrome.storage.local.get('time', (result) =>{
    let span = document.querySelector(`span#currentTime`);
    span.innerHTML = '';
    let time = result.time;
    if (time)
      span.innerHTML +=  `${time.hours}:${time.minutes}:${time.seconds}:${time.milliseconds}`
  })
}

function outputCurrentProfile(){
  chrome.storage.local.get('currentProfile', (result) => {
    let span = document.querySelector(`span#currentProfile`);
    span.innerHTML = '';
    let currentProfile = result.currentProfile;
    if (currentProfile)
      span.innerHTML += currentProfile.toString();
    else 
      span.innerHTML = ' ';
  })
}

const chooseProfile = () => {
  let nameProfile = document.querySelector(`select#profiles`).value;
  chrome.storage.local.remove( 'currentProfile', () => {} );
  chrome.storage.local.set( {currentProfile: nameProfile} );
  outputCurrentProfile();
}

const deleteProfile = () => {
  let nameProfile = document.querySelector(`select#profiles`).value;
  chrome.storage.local.remove( nameProfile, () => {} );
  chrome.storage.local.get( 'currentProfile', (result) => {
    if (nameProfile == result.currentProfile)
      chrome.storage.local.remove( 'currentProfile', () => { outputCurrentProfile();} )
  } );
  setOptionOfSelect();
}

choosingProfile.addEventListener( 'click', () => {
  chooseProfile();
})

deletingProfile.addEventListener( 'click', () => {
  deleteProfile();
})

const setTime = (form) =>{
  let inputs = form.querySelectorAll(`input`);
  let valid = true;
    for (let input of inputs){
    if (!input.checkValidity()){
      input.className += " invalid";
      valid = false;
    }else {
      input.className -= " invalid";
      continue;
    }
  }
  if (valid){
    chrome.storage.local.remove('time', () => {})
    chrome.storage.local.set( {
      'time': {
        hours: inputs[0].value,
        minutes: inputs[1].value,
        seconds: inputs[2].value,
        milliseconds: inputs[3].value 
      }
    })
  }
  outputCurrentTime();
}

settingTime.addEventListener( 'click', () => {
  setTime(formTime);
})

const setExport = () =>{
  try{
    chrome.storage.local.get( null, (result) => {
      let dataExportInput = document.querySelector('#data-export') ;
      dataExportInput.value = JSON.stringify(result);
      dataExportInput.select();
      document.execCommand("copy");
      show(document.querySelector(`#copied`));
      setTimeout( hide, 1000, document.querySelector(`#copied`))
    })
  }
  catch{
    show(document.querySelector(`#error`));
    setTimeout( hide, 1000, document.querySelector(`#error`))
  }
}

const setImport = () => {
  let dataImportInput = document.querySelector(`#data-import`)
  try {
    dataImport = JSON.parse(dataImportInput.value);
    chrome.storage.local.set(dataImport, () => {
      setOptionOfSelect()
      outputCurrentProfile();
    })
    show(document.querySelector(`#imported`));
    outputCurrentTime();
    setTimeout( hide, 1000, document.querySelector(`#imported`))

  }
  catch{
    show(document.querySelector(`#error`));
    setTimeout( hide, 1000, document.querySelector(`#error`))
  }
}

exportBtn.addEventListener( 'click', () =>{
  setExport();
})

importBtn.addEventListener( 'click', () =>{
  setImport();
})

hide(document.querySelector(`#copied`))
hide(document.querySelector(`#imported`))
hide(document.querySelector(`#error`))
showStep(currentStep);
showTab(currentTab);
hideModal();
setOptionOfSelect()
outputCurrentTime();
outputCurrentProfile();
setChecked();