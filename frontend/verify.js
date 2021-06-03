const verify_btn = document.querySelector('#verify_btn');
const ticketElement = document.querySelector('#ticketNo');

verify_btn.addEventListener('click', async() => {
    
    const ticketInput = ticketElement.value;
    
    const response = await fetch(`http://localhost:3000/api/verify/${ticketInput}`);
                
    const data = await response.json();
    console.log('verified Ticket',data);
    const message = document.querySelector('#message');
    if(data.success === true){
        message.textContent = 'Ticket Is Valid'
    }else
    message.textContent = 'Invalid Ticket!'
})