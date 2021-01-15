const mysql = require('mysql');

exports.start = mysql.createConnection({
    host: 'SG-CityInfoDB-3572-master.servers.mongodirector.com',
    user: 'sgroot',
    password: 'nyED6YVzFNn-SxzP',
    database: 'CityInfo'
});