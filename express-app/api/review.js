const expressFunction = require("express");
const router = expressFunction.Router();
const auth = require("../auth/authorize");
const Review = require("../schema/review")



router.route('/gets').get(auth, async (req, res) => {
    try {
        const result = await Review.find()
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/get/:id').get(auth, async (req, res) => {
    try {
        const id = req.params.id
        const result = await Review.findById(id)
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/create').post(auth, async (req, res) => {
    try {
        const review = new Review(req.body)
        const result = await review.save()
        res.status(200).json({mesage:"Create Successfully",data: result })
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/update/:id').put(auth, async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        
        const option = {new:true}
        const result = await Review.findByIdAndUpdate(id,data,option)
        res.status(200).json({mesage:"Update Successfully",data: result })
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/updates/quantity').put( async (req, res) => {
    try {
        
        const data = req.body
        const option = {new:true}

        await data.forEach( async element => { 
            await Review.findByIdAndUpdate(element._id,{quantity:element.quantity},option)
          });
        res.status(200).json({mesage:"Update Successfully"})
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/delete/:id').delete(auth, async (req, res) => {
    try {
        const id = req.params.id
        const result = await Review.findByIdAndDelete(id)
        res.status(200).json({mesage:"Delete Successfully",data: result })
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/get/name/:id').get(auth, async (req, res) => {
    try {
        const name = req.params.id
        console.log(name)
        const result = await Review.find({username: name}).exec()
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})



module.exports = router;
