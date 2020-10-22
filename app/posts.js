const express = require('express')
const router = express.Router()

const dateFormat = require('dateformat');

const Database = require('../lib/Database')
const conn = new Database()

router.get('/', async (req, res) => {
    try {

        let limit = 100
        let offset = 0
        let qry = ''

        offset = ((!req.query.page) ? 0 : limit * (req.query.page - 1))

        let rows = await conn.query("SELECT t1.id,t1.title,t1.description,t1.date FROM posts as t1 order by t1.date desc LIMIT " + offset + ", " + limit)

        if (rows.length) {
            res.status(200).json({ data: rows, message: 'Success' })
        }
        else {
            res.status(404).json({ data: [], message: 'Not found' })
        }
    }
    catch (err) {
        res.status(403).json({ message: err });
    }
})

router.get('/:id', async (req, res) => {
    try {

        let rows = await conn.query("SELECT t1.id,t1.title,t1.description,t1.date FROM posts as t1 where t1.id=" + req.params.id + " LIMIT 1")
        if (rows[0]) {
            res.status(200).json({ data: rows[0], message: 'Success' })
        }
        else {
            res.status(404).json({ data: [], message: 'Not found' })
        }

    }
    catch (err) {
        res.status(403).json({ message: err });
    }
})

router.post('/', async (req, res) => {
    try {

        let rows = await conn.query("insert into posts(title,description,date) values('" + req.body.title + "','" + req.body.description + "','" + dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss") + "')")
        if (rows) {
            res.status(200).json({ data: rows[0], message: 'Success' })
        }
        else {
            res.status(404).json({ data: [], message: 'Not found' })
        }

    }
    catch (err) {
        res.status(403).json({ message: err });
    }
})

router.delete('/:id', async (req, res) => {
    try {

        let rows = await conn.query("delete from posts where id='" + req.params.id + "'")
        if (rows) {
            res.status(200).json({ data: rows[0], message: 'Success' })
        }
        else {
            res.status(404).json({ data: [], message: 'Not found' })
        }

    }
    catch (err) {
        res.status(403).json({ message: err });
    }
})

router.put('/:id', async (req, res) => {
    try {


        if (req.body.title) {
            let rows = await conn.query("update posts set title='" + req.body.title + "' where id='" + req.params.id + "'")
        }

        if (req.body.description) {
            let rows = await conn.query("update posts set description='" + req.body.description + "' where id='" + req.params.id + "'")
        }

        let rows = await conn.query("SELECT t1.id,t1.title,t1.description,t1.date FROM posts as t1 where t1.id=" + req.params.id + " LIMIT 1")
        if (rows[0]) {
            res.status(200).json({ data: rows[0], message: 'Success' })
        }
        else {
            res.status(404).json({ data: [], message: 'Not found' })
        }

    }
    catch (err) {
        res.status(403).json({ message: err });
    }
})




module.exports = router