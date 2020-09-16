const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

// router.get('/', (req, res) => {
//     db('posts')  // default select all columns and return them from table
//     .then(posts => {
//         res.json(posts);
//     })
//     .catch( err => {
//         res.status(500).json({ message: "error getting posts" , error: err });
//     });
// });

// example of async
router.get('/', async (req, res) => {
    try {
        const posts = await db('posts');  // default select all columns and return them from table
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "error getting posts" , error: err });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [post] = await db('posts').where({ id });


        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'bad id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'db error', error: err });
    }
    
});

router.post('/', async (req, res) => {
    
    const newPost = req.body;
    try {
        const post = await db("posts").insert(newPost);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: 'error inserting', error: err });
    }

});


router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const changes = req.body;

    try {
        const count = await db('posts').update(changes).where({ id });

        if (count) {
            res.json({ updated: count });
        } else {
            res.status(404).json({ message: 'invalid id' });
        }
    } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'error updating', error: err });
    }
});

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const count = await db('posts').where({ id }).del();

        if (count) {
            res.json({ deleted: count });
        } else {
            res.status(404).json({ message: 'invalid id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'error deleting', error: err });
    }

});

module.exports = router;




/*   

router.get('/', (req, res) => {
    // const sql = db.select('*').from('posts').toString();
    const sql = db('posts').toString();
    console.log(sql);
    // db.raw('SELECT * FROM posts')
    // db.select('*').from('posts')  // below is short hand from Knex
    db('posts')  // default select all columns and return them from table
    .then(posts => {
        res.json(posts);
    })
    .catch( err => {
        res.status(500).json({ message: "error getting posts" , error: err });
    });
});


*/