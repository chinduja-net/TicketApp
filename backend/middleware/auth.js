const jwt = require('jsonwebtoken');
const { getStaffByUsername } = require('../model/operations');

function user (request, response, next) {
  try {
    const token = request.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const data = jwt.verify(token, 'a1b1c1');
    console.log('User middleware jwt Verify', data);
    
    const user = getStaffByUsername(data.username);
    
    if(!user) {
      throw Error();
    } else if(user.role !== 'staff'){
        throw new Error()
    }else {
      
      next();
    }SX

  } catch(error) {
    response.status(401).json({ success: false, message: 'Permission denied' });
  }
}

exports.user = user;