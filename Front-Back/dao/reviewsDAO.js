import mongodb from "mongodb"
const ObjectId=mongodb.ObjectId

global.reviews = null

export default class ReviewsDAO{
    static async injectDB(conn){
        if (global.reviews){
            return;
        }
        try{
            global.reviews=await conn.db("reviews").collection("reviews")
            console.log(global.reviews)
        }
        catch(e){
            console.error(`Unable to establish collection handles in userDAO ${e}`)
        }
    }

    static async addReview(userId,user,password){
        try{
            const reviewDoc={
                userId: userId,
                user: user,
                password: password,
            }
            return await global.reviews.insertOne(reviewDoc)
        }
        catch(e){
            console.error(`Unable to post review: ${e}`)
            return {error:e}
        }
    }

    static async getReview(reviewId){
        try{
            console.log(global.reviews)
            return await global.reviews.findOne({_id:ObjectId(reviewId)})
        }
        catch (e){
            console.error(`Unable to get review: ${e}`)
            return {error: e}
        }
    }

    static async updateReview(reviewId,user,password){
        console.log("rev",reviewId)
        try{
            const updateResponse=await global.reviews.updateOne(
                {_id: ObjectId(reviewId)},
                {$set:{user:user, password:password}}
            )
            return updateResponse
        }
        catch(e){
            console.error(`Unable to update review: ${e}`)
            return {error: e}
        }
    }

    static async deleteReview(reviewId){
        try{
            const deleteResponse=await global.reviews.deleteOne({_id:ObjectId(reviewId),})
            return deleteResponse
        }
        catch(e){
            console.error(`Unable to delete review: ${e}`)
            return  {error: e}
        }
    }

    static async getReviewsByMovieId(userId){
        console.log("mov",userId)
        try{
            const cursor=await global.reviews.find({userId:parseInt(userId)})
            return cursor.toArray()
        }
        catch(e){
            console.error(`Unable to get review ${e}`)
            return {error: e}
        }
    }
}