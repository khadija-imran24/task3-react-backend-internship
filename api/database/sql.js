const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'b2ono8d7tfmzajnhawjd-mysql.services.clever-cloud.com',
  user: 'urhfqk3pxurx8rqf',
  password: 'tcNRCGMvyscmba4CPzF4',
  database: 'b2ono8d7tfmzajnhawjd',
  port: 3306 // usually 3306, confirm from Clever Cloud panel
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to Clever Cloud MySQL');
  }
});

module.exports = db;
