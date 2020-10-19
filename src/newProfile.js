const overturnDelivery = document.querySelector('.delivery .head');
const overturnPayment = document.querySelector('.payment .head');

overturnDelivery.addEventListener('click', () =>{
    showStep('delivery');
})
overturnPayment.addEventListener('click', () =>{
    showStep('payment');
})

this.firstName.addEventListener('keyup', () =>{
    mask(this.firstName, null, 'A', '', null);
})
this.middleName.addEventListener('keyup', () =>{
    mask(this.middleName, null, 'A', '', null);
})
this.lastName.addEventListener('keyup', () =>{
    mask(this.lastName, null, 'A', '', null);
})
this.postCode.addEventListener('keyup', () =>{
    mask(this.postCode, 6, '0', '-', 3);
})
this.phone.addEventListener('keyup', () =>{
    mask(this.phone, 10, '0', null, null);
})
this.cardNumber.addEventListener('keyup', () =>{
    mask(this.cardNumber, 16, '0', ' ', 4);
})
this.cardExpiry.addEventListener('keyup', () =>{
    mask(this.cardExpiry, 4, '0', '/', 2);
})
this.cardCvc.addEventListener('keyup', () =>{
    mask(this.cardCvc, 3, '0', null, null);
})


function hideStep(step){
        document.querySelector(`.${step} .head img`).src="./assets/img/expand.svg";
        document.querySelector(`.${step} .inputs`).classList.add('none');
}
function showStep(step){
    if (document.querySelector(`.${step} .inputs.none`)){
        document.querySelector(`.${step} .head img`).src="./assets/img/overturn.svg";
        document.querySelector(`.${step} .inputs`).classList.remove('none');
    }
    else hideStep(step);
}