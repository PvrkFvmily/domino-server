const router = require('express').Router()
const db = require ('../models')
const jwt = require('jsonwebtoken')

/// Theo _____________________________________________
// GET /posts -- respond with all posts 
router.get('/', async (req, res) => {
    // so this means that we are gonna try something and if it fails, maybe someone will catch it or something
    try{
        // so here we are creating an unchangable variable, but it could be a mutable variable (as if it were an array or object that we can pop and push things into or out of respectively)
        const posts = await db.Post.find({})
        // here we are sending a request through the res function object, standing for resquest, otherwise meaning a response from the server to the client
        res.json(posts)
    // oh shoot we got this thing catching an 'err'? what is that?
    }catch(err) {
        // money sign err ?? what is this?
        console.log(`${err}`)
        // so here we are sending a status of 500, which means that there is no issue and continue on as though nothing had changed.
        res.status(500).json({ msg: 'server error 1'})
    }
})

//GET /posts/:id -- respond with details specific post 
router.get('/:id', async (req, res) => {
    try{
        //look up a specific post using id
        const post = await db.Post.findById(req.params.id)

        //if the post is not found 
        if(!post) {
            res.status(404).json({ msg: `Post not found` })
            return //won't send headers twice/ won't crash nodemon
        }
        
        //respond with post that has been found
        res.json(post)
    }catch(err) {
        console.log(`${err}`)
        res.status(500).json({ msg: 'Server Error 2'})
    }
})
// __________________________________________________ T END

//POST /posts create a new psot
router.post('/', async(req, res) => {
    try{
        // const authHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9ieSBrZWl0aCIsImVtYWlsIjoidEBiIiwiaWQiOiI2M2QxYjM0NmM5OTkxYTE1ZDc3YTRlZTIiLCJpYXQiOjE2NzQ2ODgwOTgsImV4cCI6MTY3NDY5MTY5OH0.l1Ko8OVmzFrrS25H_iZwkveNV-qmH0MjVdjry3wPIEc' /*req.headers.authorization*/
        // const decode = await jwt.verify(authHeader, process.env.JWT_SECRET)
        // const foundUser = await db.User.findById(decode.id)

        // get user info from local storage jwt
        const post = await db.Post.create({
            user: '63d492c44bc6fd2d0d5bb882',
            title: req.body.title,
            content: req.body.content
        })
        res.status(201).json(post)
    }catch(err) {
        console.log(`${err}`)
        res.status(500).json({ msg: 'server error post 3'})
    }
})

//PUT /posts/:id -- update a post @ id 
router.put('/:id', async (req, res) => {
    try{
        //grab the id from the url 
        //get data to update in req.body
        const updatedPost = await db.Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedPost) {
            if(!post) {
                res.status(404).json({ msg: `Post not found` })
                return //won't send headers twice/ won't crash nodemon
            }
        }
        res.json(updatedPost)
    } catch (error) {
        console.log(`${err}`)
        res.status(500).json({ msg: 'Server Error 4'})
    }
})

//DELETE /posts/:id -- deletes a post @ id
router.delete('/:id', async (req, res) =>{
    try{
        // get the post id from the url, and destroy that id (post)
        const deletedPost = await db.Post.findByIdAndDelete(req.params.id)
        if(!deletedPost) {
            res.status(404).json({message: 'Sad, post not found'})
            return // don't want to send headers twice, stop the function
        }
        // send a status of 204 (no content) and nothing else 
        res.sendStatus(204)
    }catch(err) {
        console.log(err)
        if(err.kind === "ObjectId") {
            res.status(404).json({msg: err.message})
        } else{
            res.status(500).json({msg: "Internal Server Error, Please contact the System Admnistrator"})
        }
    }
})

//POST /posts/:id/comments -- creates a comment

router.post('/:id/comments', async (req, res) => {
    try {
        //     {$push: {comments: {content: 'Screw all these other commenters', user: newUser.name}}},
        const postId = req.params.id
        const newComment = await db.Post.findByIdAndUpdate(postId,{$push:{comments:req.body}},{upsert: true, new: true})
        if(!newComment){
            res.status(404).json({msg:"Post is not found"})
        }
        res.json(newComment)
    } catch(err) {
        console.log(err)
        res.status(500).json({message: "Internal Server Error, Contact the System Administrator"})
    }
})

router.put('/:id/comment/:idx', async (req, res) => {
    try {
        const findPost = await db.Post.findById(req.params.id)
        if (!findPost) {
            res.status(404).json({msg: "Post is not found"})
        }
        const editComment = findPost.comments.id(req.params.idx)
        editComment.content = req.body.content
        await findPost.save()
        res.json(findPost)
    } catch(err) {
        console.log(err)
        if(err.kind === "ObjectId") {
            res.status(404).json({msg: err.message})
        } else{
            res.status(500).json({msg: "Internal Server Error, Please contact the System Admnistrator"})
        }
    }
})

module.exports = router