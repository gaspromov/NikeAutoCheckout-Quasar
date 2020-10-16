const profiles = document.querySelector('header ul li#profiles') 
const release = document.querySelector('header ul li#release') 
const settings = document.querySelector('header ul li#settings') 

// listen button and show/hide tabs
profiles.addEventListener('click', () => {showTab('profiles')})
release.addEventListener('click', () => {showTab('release')})
settings.addEventListener('click', () => {showTab('settings')})