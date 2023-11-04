module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'Com-gt',
        user: process.env.DB_User || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite', //sqlite mysql
            storage: './Electronic_store_database.sqlite'
                //host: process.env.HOST || 'localhost',
        },
    },
    authentication: {
        jwtSecret: 'test'
    }
}