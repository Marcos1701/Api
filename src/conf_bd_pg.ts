import Client from 'pg'

const client = new Client.Client({
    host: 'containers-us-west-206.railway.app',
    port: 6892,
    user: 'postgres',
    password: 'hA01TIADLVRlHUtDOVAk',
    database: 'railway'
});

export { client }
