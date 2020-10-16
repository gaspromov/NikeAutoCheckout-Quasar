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