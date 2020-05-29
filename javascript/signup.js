// SELECTING ELEMENTS
let loginHead = document.querySelector('#login-head');
let signupHead = document.querySelector('#signup-head');
let optionDiv = document.querySelector('.option-div');
let loginDiv = document.querySelector('#login');
let signupDiv = document.querySelector('.signup-div');
let choiceDiv = document.querySelector('#choice');
let consumerForm = document.querySelector('#consumer-signup');
let wholesalerForm = document.querySelector('#wholesaler-signup');
let output = document.querySelector('#output');
let success = document.querySelector('#success');

//EVENT LISTENERS
optionDiv.addEventListener('click', toggleBorder);
// choiceDiv.addEventListener('click', displayForm);
consumerForm.addEventListener('submit', submitConsumerForm);
// wholesalerForm.addEventListener('submit', submitWholesalerForm);
loginDiv.addEventListener('submit', submitLoginForm);




//EVENTS
function toggleBorder(e) {
    if(e.target.id==='login-head') {
        if(!loginHead.classList.contains('toggle')) {
            loginHead.classList.toggle('toggle');
            signupHead.classList.toggle('toggle');
            // choiceDiv.style.display = 'none';
            loginDiv.style.display = 'block';
            consumerForm.style.display = 'none';
            // wholesalerForm.style.display = 'none';
            output.style.display = 'none';
        }
    }

    if(e.target.id==='signup-head') {
        if(!signupHead.classList.contains('toggle')) {
            signupHead.classList.toggle('toggle');
            loginHead.classList.toggle('toggle');
            loginDiv.style.display = 'none';
            // choiceDiv.style.display = 'block';
            consumerForm.style.display = 'block';
            // wholesalerForm.style.display = 'none';
            output.style.display = 'none';
        }
    }   
};

// function displayForm(e) {
//     if(e.target.id==='consumer') {
//         choiceDiv.style.display = 'none';
//         consumerForm.style.display = 'block';
//     }

//     if(e.target.id==='wholesaler') {
//         choiceDiv.style.display = 'none';
//         wholesalerForm.style.display = 'block';
//     }
// }


function submitConsumerForm(e) {
    e.preventDefault();

    let firstName = document.querySelector('#sc-firstname').value;
    let lastName = document.querySelector('#sc-lastname').value;
    let email = document.querySelector('#sc-email').value;
    let password = document.querySelector('#sc-password').value;

    output.innerHTML = '';
    loading.innerHTML = `<p> Loading...</p>`

    fetch('https://evonline.herokuapp.com/api/v1/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json' 
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data=> {
        output.style.display = 'block';
        if(data.status==='fail') {
            if(output.classList.contains('success')){
                output.classList.toggle('success');
            }
            if(!output.classList.contains('fail')){
                output.classList.toggle('fail');
            } 
            output.innerHTML = `<p>${data.error}</p>`;
        } else if(data.status==='success'){
            if(output.classList.contains('fail')){
                output.classList.toggle('fail');
            }
            if(!output.classList.contains('success')){
                output.classList.toggle('success');
            }
            output.innerHTML = `<p>Sign up successful!</p>`
        }
        loading.innerHTML = '';
    })
};

function submitWholesalerForm(e) {
    e.preventDefault();

    let firstName = document.querySelector('#sw-firstname').value;
    let lastName = document.querySelector('#sw-lastname').value;
    let email = document.querySelector('#sw-email').value;
    let password = document.querySelector('#sw-password').value;
    let phoneNumber = document.querySelector('#sw-number').value;
    let shopAddress = document.querySelector('#sw-address').value;

    output.innerHTML = '';
    loading.innerHTML = `<p> Loading...</p>`

    fetch('https://evonline.herokuapp.com/api/v1/signup/wholesaler', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json' 
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            shopAddress, shopAddress
        })
    })
    .then(res => res.json())
    .then(data=> {
        output.style.display = 'block';
        if(data.status==='fail') {
            if(output.classList.contains('success')){
                output.classList.toggle('success');
            }
            if(!output.classList.contains('fail')){
                output.classList.toggle('fail');
            } 
            output.innerHTML = `<p>${data.error}</p>`;
        } else if(data.status==='success'){
            if(output.classList.contains('fail')){
                output.classList.toggle('fail');
            }
            if(!output.classList.contains('success')){
                output.classList.toggle('success');
            }
            output.innerHTML = `<p>Sign up successful!</p>`;
            location.reload()
        }
        loading.innerHTML = '';

    })
};

function submitLoginForm(e) {
    e.preventDefault();

    let email = document.querySelector('#login-email').value;
    let password = document.querySelector('#login-password').value;

    output.innerHTML = '';
    loading.innerHTML = `<p> Loading...</p>`;

    fetch('https://evonline.herokuapp.com/api/v1/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json' 
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data=> {
        // console.log(data);
        // if(data.status=='Fail') {
        //     output.innerHTML = `<p>${data.error}</p>`;   
        // }
        
        output.style.display = 'block';
        if(data.status==='Fail') {
            // console.log('yes');
            if(output.classList.contains('success')){
                output.classList.toggle('success');
            }
            if(!output.classList.contains('fail')){
                output.classList.toggle('fail');
            } 
            output.innerHTML = `<p>${data.error}</p>`;
        } else {
            if(output.classList.contains('fail')){
                output.classList.toggle('fail');
            }
            if(!output.classList.contains('success')){
                output.classList.toggle('success');
            }
            // output.innerHTML = `<p>Log in successful!</p>  
            // <a href="/public/inner pages/newlandingpage.html" class="lol">Home</a>                  
            // `
            output.innerHTML = `<p>Welcome back ${data.user.First_Name} 😎! Please click  <a href="./newlandingpage.html">Here</a> to continue shopping</p>`
            loginDiv.reset();
            localStorage.setItem('token', data.token);
            location.replace("./newlandingpage.html")
        }
        loading.innerHTML = '';
    })

    // output.innerHTML+= '<a href="/public/inner pages/newlandingpage.html">Home</a>'
    // if(output.classList.contains('success')) {
    //     console.log('yes');
    // }
};
