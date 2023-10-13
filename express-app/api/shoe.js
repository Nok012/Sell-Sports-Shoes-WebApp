const expressFunction = require("express");
const router = expressFunction.Router();
const auth = require("../auth/authorize");
const Shoe = require("../schema/shoe")



router.route('/gets').get(auth, async (req, res) => {
    try {
        const result = await Shoe.find()
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/get/:id').get(auth, async (req, res) => {
    try {
        const id = req.params.id
        const result = await Shoe.findById(id)
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/create').post(auth, async (req, res) => {
    try {
        const shoe = new Shoe(req.body)
        const result = await shoe.save()
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
        const result = await Shoe.findByIdAndUpdate(id,data,option)
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
            await Shoe.findByIdAndUpdate(element._id,{quantity:element.quantity},option)
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
        const result = await Shoe.findByIdAndDelete(id)
        res.status(200).json({mesage:"Delete Successfully",data: result })
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})



module.exports = router;