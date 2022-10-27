const Pool = require('pg').Pool

const pg_conn = new Pool({
    user: 'nakajaizbrueuw',
    host: 'ec2-44-209-186-51.compute-1.amazonaws.com',
    database: 'd9heuccapuj3qf',
    password: '2b5d8fe93c68d8fa88c3d9ab1d0e5e9e8df55169a2b555f658c2bc3b1abc4799',
    port: 5432,

    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pg_conn