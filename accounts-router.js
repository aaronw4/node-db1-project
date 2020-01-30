const express = require('express');

const db = require('./data/dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch (err) {
        
    }
})

router.get('/:id', async (req, res) => {
    try {
        const [account] = await db('accounts').where('id', req.params.id);
        res.status(200).json(account);
    } catch {
        res.status(500).json({error: 'Failed to get account.'})
    }
})

router.post('/', async (req, res) => {
    try {
        const account = await db('accounts').insert(req.body);
        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({error: 'Failed to post account.'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const accountUpdate = await db('accounts')
            .where('id', req.params.id)
            .update(req.body);
        res.status(200).json({updated: accountUpdate});
    } catch {
        res.status(500).json({error: 'Failed to update account.'})
    }
})


module.exports = router;