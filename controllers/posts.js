const router = require('express').Router()
const db = require ('../models')
const jwt = require('jsonwebtoken')


// GET /posts
router.get('/', async (req, res) => {
    try{
        const posts = await db.Post.find({})
        res.json(posts)
    }catch(err) {
        console.log(`${err}`)
        res.status(500).json({ msg: 'esrver error'})
    }
})

router.post('/', async(req, res) => {
    try{
        // const authHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9ieSBrZWl0aCIsImVtYWlsIjoidEBiIiwiaWQiOiI2M2QxYjM0NmM5OTkxYTE1ZDc3YTRlZTIiLCJpYXQiOjE2NzQ2ODgwOTgsImV4cCI6MTY3NDY5MTY5OH0.l1Ko8OVmzFrrS25H_iZwkveNV-qmH0MjVdjry3wPIEc' /*req.headers.authorization*/
        // const decode = await jwt.verify(authHeader, process.env.JWT_SECRET)
        // const foundUser = await db.User.findById(decode.id)

        // get user info from local storage jwt
        const post = await db.Post.create({
            user: '63d48fa92ea0a53fa5fad8aa',
            title: req.body.title,
            content: req.body.content
        })
        res.status(201).json(post)
    }catch(err) {
        console.log(`${err}`)
        res.status(500).json({ msg: 'esrver error post'})
    }
})

router.get('/:id', async (req, res) => {
    try{
        
    }catch(err) {
        console.log(`${err}`)
        res.status(500).json({ msg: 'esrver error get id'})
    }
})

module.exports = router