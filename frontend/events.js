const eventElem = document.querySelector('#event');

async function displayEvents() {

    const response = await fetch('http://localhost:3000/api/events');
    const data = await response.json();
    for (let i = 0; i < 4; i++) {

        const newElement = document.createElement('div');
        newElement.innerHTML = `<div class = "eventlist">
        <div class = "sec1">
        <p class = "event_date">${data[i].date}</p>
        <p class = "event_month">${data[i].month}</p>
        </div>
        <span>
        <div class ="sec2">
        <h3 class = "event_name">${data[i].name}</h3>
        <h4 class = "event_location">${data[i].location}</h4>
        <p class = "event_time">${data[i].timeFrom} - ${data[i].timeTo}</p>
        </div>
        <div class = "sec3">
        <h4 class = "event_price">${data[i].price}</h4>
        </div>
        </span>
        </div>`
        eventElem.appendChild(newElement);

    }
    buyTicket(data);
}
displayEvents();


async function buyTicket(data) {
    const eventList = document.querySelectorAll('.eventlist');
    for (let i = 0; i < eventList.length; i++) {

        eventList[i].addEventListener('click', async () => {
            const response = await fetch(`http://localhost:3000/api/buyTicket/${data[i].name}`);
            const data_ticket = await response.json();
            createBuyTicket(data_ticket);

        })
    }
}
const buyElem = document.getElementById('buy');


async function createBuyTicket(data_ticket) {

    const newTicket = document.createElement('div');
    newTicket.className = "newTicket";
    newTicket.innerHTML = `<h3 id = "buyName">${data_ticket.name}</h3>
    <p id = "buyDate">${data_ticket.date} ${data_ticket.month} Kl ${data_ticket.timeFrom} - ${data_ticket.timeTo}</p>
    <h4 id = "buyLocation"> @ ${data_ticket.location}</h4>
    <h3 id = "buyPrice">${data_ticket.price}</h3>`
    buyElem.appendChild(newTicket);
    //location.href = 'http://localhost:3000/buyTicket.html'
      displayTicket(data_ticket)
}
async function displayTicket(data_ticket){
    
    const pay_btn = document.querySelector('#pay_btn');
    const display = document.querySelector('#display');
    
    pay_btn.addEventListener('click', async () => {

        const response = await fetch(`http://localhost:3000/api/showTicket/${data_ticket.id}`);
        const data = await response.json();

        const showTicket = document.createElement('div');
        showTicket.className = "showTicket"
        showTicket.innerHTML =
        `<h4 id = "ticket_title">WHAT</h4>
        <h2 id = "ticket_name">${data.name}</h2>
        
        <h4 id = "ticket_title">WHERE</h4>
        <h2 id = "ticket_location">${data.location}</h2>
       
        <section id ="table">
       
        <div id = "ticket_time">
        <h4 id = "ticket_title">WHEN</h4>
        <h2>${data.date}${data.month}</h2>
        </div>
        
        <div id = "ticket_time_br">
        <h4 id = "ticket_title">FROM</h4>
        <h2>${data.timeFrom}</h2>
        </div>
        
        <div id = "ticket_time">
        <h4 id = "ticket_title" >TO</h4>
        <h2>${data.timeTo}</h2>
        </div>
       
        </section>

        <img src="./image/barcode.png" alt="barcode" srcset="">
        <h3 id = "ticket_biljett">Biljettnummer ${data.ticketIssued}</h3>
        <p id="message">Ticket Left: ${data.ticketLeft}</p>
        `
        display.appendChild(showTicket)
        
    })
}








