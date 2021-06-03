const lowdb = require('lowdb');
const Filesync = require('lowdb/adapters/FileSync');
const adapter = new Filesync('Events.json');
const dbEvents = lowdb(adapter);
const adapter1 = new Filesync('staff.json');
const dbStaff = lowdb(adapter1);
const {hashPassword, comparePassword} = require('../utils/utils');

function getAllEvents(){
return dbEvents.get('event').value();
}
function buyTicket(name){
  return dbEvents.get('event').find({name : name}).value();
  
}
function showTicket(id){
  return dbEvents.get('event').find({id : id}).value(); 
  }
  
async function createAccount(account){
    account.password = await hashPassword(account.password);
   return dbStaff.get('account').push(account).write();
}

async function checkCredentials(credentials) {
    const user = dbStaff.get('account')
            .find({ username: credentials.username })
            .value();
    
    if (user) {
      return await comparePassword(credentials.password, user.password);
    } else {
      return false;
    }
  }

  async function getStaffByUsername(username){
    const user = dbStaff.get('account').find({username : username}).value();
      return user;
  }

 function verifyTicket(ticket){

  if(dbEvents.get('event').map('verifiedTkt').value().flat().includes(ticket)){
    return false;
  }else{
  if(dbEvents.get('event').map('ticketNo').value().flat().includes(ticket)) {
    let ver_Ticket =dbEvents.get('event').push({verifiedTkt : ticket})
                    .write();
                    console.log(ver_Ticket);
                    return true;
  }else

   false
        
  }       
}
  
  function getUserById(id) {
    return database.get('accounts').find({ id: id }).value();
  }

exports.createAccount = createAccount;
exports.getAllEvents = getAllEvents;
exports.checkCredentials = checkCredentials;
exports.getStaffByUsername = getStaffByUsername;
exports.verifyTicket = verifyTicket;
exports.buyTicket = buyTicket;
exports.getUserById = getUserById;
exports.showTicket = showTicket;