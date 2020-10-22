const util = require('util');
const mysql = require('mysql');

const config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "demo"
};

class Database {
    constructor(external_config) {
        if (external_config) {
            config = external_config
        }
        this.connection = mysql.createConnection(config);
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = Database