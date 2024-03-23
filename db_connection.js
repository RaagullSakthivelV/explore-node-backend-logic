import pg from 'pg';
const {Pool} = pg;

export const pool = new Pool({
    user:'postgres',
    password:'Activate@28',
    host:'localhost',
    port:5432,
    database:'steam-a-test-db'
})