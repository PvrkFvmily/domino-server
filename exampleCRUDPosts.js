
let db = require('./models')


const postCRUD = async () => { 
    try {
        // create a new user or find the user (who will be in local storage)
        const newUser = await db.User.findOne({
            name: 'Billy John'
        })
        // console.log(newUser)
        ////// READ POST //////
        // const findPosts = await db.Post.findOne({})
        // console.log(findPosts)
        ////////////////////// CREATE POST /////////////////////
        // this will be filled out by req.body
        // const newPost = await db.Post.create({
        //     title: 'How I learned to hate pizza. A true story.',
        //     content: 'I didnt, I lied. I love pizza.',
        //     // we would have:
        //     // user: req.body.user (or it will be a hidden input in the form)
        // })
        const newPost = await db.Post.findOne({
            user: newUser._id
        }).populate('user')
        // likely we will not have to do this, as the user._id will be in local storage
        // newPost.user = newUser._id
        // await newPost.save()
        
        ///////////////////// CREATE COMMENT ///////////////////
        // const newComment = {
        //     content: 'Fuck you',
        //     user: newUser._id
        // }
        // newPost.comments.push(newComment)
        // await newPost.save()
        // OR

        // const newCommentOnPost = await db.Post.findOneAndUpdate(
        //     {title: 'How I learned to hate pizza. A true story.'},
        //     {$push: {comments: {content: 'Screw all these other commenters', user: newUser.name}}},
        //     {upsert: true, new: true}
        // ).populate('user')
        // console.log(newCommentOnPost)

        //////////////// UPDATE POST ////////////////////////
        // find the post, fill input fields with the post's data
        // allow the user to edit the post
        // post info will already be accessible as the edit button will only be accessible on the detail page for the post
        // const updatePost = await db.Post.findOneAndUpdate(
        //     {title: 'How I learned to hate pizza. A true story.'},
        //     {title: 'How I learned to love pizza. A true story.', content: 'I loved it all along'},
        //     {upsert: true, new: true}
        // ).populate('user')
        // in our controller we would have :
        // db.Post.findOneAndUpdate(
            //{tile: either req.params.id or some req.body},
            //{ whatever we want to update }
            //{upsert: true, new: true}
            //}
        // console.log(updatePost)
        // OR
        // const findPost = await db.Post.findOne({title: 'How I learned to love pizza. A true story.'})
        // const newTitle = 'BLAHBLAHBLAHBLAHBLAH'
        // findPost.title = newTitle
        // await findPost.save()
        // console.log(findPost)
        // in our controller we would have: 
        // const findPost = await db.Post.findOne({title: either req.params.id or some req.body})
        // const newContent or newTitle = req.body.content or title
        // findPost.content/title = newContent/newTitle

        /////////////////////// UPDATE COMMENT ///////////////////////
        // // we need to see that the blog that has the comment
        // const findPost = await db.Post.findOne({title: 'BLAHBLAHBLAHBLAHBLAH'})
        // // this new comment will be the user input
        // const newComment = 'I am an updated commnet'
        // // i dont know if this will work competely, as we dont have the array position of the comment rn
        // findPost.comments[0].user/content = newComment
        // // maybe if we want we can not edit 
        // await findPost.save()
        // console.log(findPost)

        ///////////////////// DELETE POST /////////////////////////////
        // const deletePost = await db.Post.findOneAndDelete({title: 'BLAHBLAHBLAHBLAHBLAH'})
        



        ////////////////////// DELETE COMMENT /////////////////////////
        // const findPost = await db.Post.findOne({title: 'BLAHBLAHBLAHBLAHBLAH'})
        // findPost.comment[0].resmove()
        // await findPost.save()
    
        



        // console.log(newPost)
    } catch(poo) {
        console.log(`postCRUD: ${poo}`)
    }
}

postCRUD()