// SELECTING ELEMENTS
let loginHead = document.querySelector('#login-head');
let signupHead = document.querySelector('#signup-head');
let optionDiv = document.querySelector('.option-div');
let loginDiv = document.querySelector('#login');
let signupDiv = document.querySelector('.signup-div');
let choiceDiv = document.querySelector('#choice');
let consumerForm = document.querySelector('#consumer-signup');
let wholesalerForm = document.querySelector('#wholesaler-signup');

//EVENT LISTENERS
optionDiv.addEventListener('click', toggleBorder);
choiceDiv.addEventListener('click', displayForm);



//EVENTS
function toggleBorder(e) {
    if(e.target.id==='login-head') {
        if(!loginHead.classList.contains('toggle')) {
            loginHead.classList.toggle('toggle');
            signupHead.classList.toggle('toggle');
            choiceDiv.style.display = 'none';
            loginDiv.style.display = 'block';
            consumerForm.style.display = 'none';
            wholesalerForm.style.display = 'none';
        }
    }

    if(e.target.id==='signup-head') {
        if(!signupHead.classList.contains('toggle')) {
            signupHead.classList.toggle('toggle');
            loginHead.classList.toggle('toggle');
            loginDiv.style.display = 'none';
            choiceDiv.style.display = 'block';
            consumerForm.style.display = 'none';
            wholesalerForm.style.display = 'none';
        }
    }   
};

function displayForm(e) {
    if(e.target.id==='consumer') {
        choiceDiv.style.display = 'none';
        consumerForm.style.display = 'block';
    }

    if(e.target.id==='wholesaler') {
        choiceDiv.style.display = 'none';
        wholesalerForm.style.display = 'block';
    }
}

// function displayForm(e) {
//     console.log('yes');
// }