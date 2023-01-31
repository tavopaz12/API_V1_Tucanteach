const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNjc1MTI2Njc2fQ.oFiPyMCZA6t499A6GxNiydEvcqaSO0sdG9v1f5rseIQ'

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload)