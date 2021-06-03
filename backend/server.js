const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('../frontend'));

const {nanoid} = require('nanoid');
const jwt = require('jsonwebtoken');
const{createAccount, getAllEvents, checkCredentials, getStaffByUsername, verifyTicket, buyTicket, showTicket} = require('./model/operations');
const { user } = require('./middleware/auth');


app.get('/api/events', (request, response) => {
    
    const allEvents = getAllEvents();
    
    response.json(allEvents);
})

app.get('/api/buyTicket/:name', (request, response) => {

    const name = request.params.name;
    const data = buyTicket(name);
    response.json(data);

})


app.get('/api/showTicket/:id', (request, response) => {
    const id = +(request.params.id);
    const data = showTicket(id);
    let ticketArray = data.ticketNo;
    data.ticketIssued =  ticketArray.pop()
    if(ticketArray.length > 0)
    data.ticketLeft = ticketArray.length;
    else{
      data.ticketLeft = "SOLD OUT";
      data.ticketIssued = 0;
    }
    
    console.log(data);
    response.json(data)
})

app.post('/api/createAccount', (request, response) => {
    const account = request.body;
    let result = { success: false }
    account.id = nanoid();
    account.role = 'staff';
    const createdAccount = createAccount(account);
    if (createdAccount) {
        result.success = true;
      }
    response.json(result);

})

app.post('/api/login', (request, response) => {

    const credentials = request.body;
    const isAMatch = checkCredentials(credentials);

    let result = { success: false };
  
    if (isAMatch) {
      const user = getStaffByUsername(credentials.username);
      
      const token = jwt.sign({ id: user.id}, 'a1b1c1', {
        expiresIn: 600 
      });
  
      result.success = true;
      result.token = token;
    }
  
    response.json(result);
})

app.get('/api/loggedin', (request, response) => {

 const token = request.header('Authorization').replace('Bearer ', '');

  let result = { loggedIn: false };

  if (token) {
    const tokenVerified = jwt.verify(token, 'a1b1c1');

    console.log('JWT Verify:', tokenVerified);

    if (tokenVerified) {
      result.loggedIn = true;
    }
  }

  response.json(result);

})

app.get('/api/user', (request, response) => {
  
  let result = { success: false };
  
  if (request.user) {
    result.success = true;
    result.user = {
      
      role: request.user.role
    }
    result.token = request.token;
  }

  response.json(result);
})
app.get('/api/verify/:ticketNo', (request, response) => {

    const ticket = (request.params.ticketNo);
    
    const valid = verifyTicket(ticket);
    let result = {success : false};
    
    if(valid)
    result.success = true;
    response.json(result)
   

})

app.listen(3000, ()=> {
    console.log('Server is up..');
})
