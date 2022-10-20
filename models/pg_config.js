const Pool = require('pg').Pool

const pg_conn = new Pool({
    user: 'qdmpvczyinibiu',
    host: 'ec2-3-213-66-35.compute-1.amazonaws.com',
    database: 'd4ne9bk2o3atvk',
    password: '0bb71fdd9dfd1980a2c27d405d031b545ef9536aa2c90c7b5fb1cdb83f6cf866',
    port: 5432,

    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pg_conn