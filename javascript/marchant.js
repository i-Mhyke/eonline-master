let form = document.querySelector('form');
let name = document.querySelector('#name');
let category = document.querySelector('#category');
let price = document.querySelector('#price');
let number = document.querySelector('#numberAvailable');
let image = document.querySelector('#image');


form.addEventListener('submit', submitForm);


function submitForm(e) {
    e.preventDefault();
    
    fetch('https://evonline.herokuapp.com/api/v1/wholesaler/products', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: new FormData(form)
    })
    .then(res=>res.json())
    .then(data=> {
        // document.querySelector('body').appendChild(data);
        console.log(data)
    })
    
    output.innerHTML = `<p>Product uploaded successfully!</p>`;
    output.className = 'success';
    
}

