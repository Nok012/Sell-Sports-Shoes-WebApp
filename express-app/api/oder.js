const expressFunction = require("express");
const router = expressFunction.Router();
const auth = require("../auth/authorize");
const Oder = require("../schema/oder");

router.route('/gets').get(auth, async (req, res) => {
    try {
        const result = await Oder.find()
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/get/:id').get(auth, async (req, res) => {
    try {
        const id = req.params.id
        const result = await Oder.findById(id)
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/create').post(auth, async (req, res) => {
    try {
        const oder = new Shoe(req.body)
        const result = await oder.save()
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
        const result = await Oder.findByIdAndUpdate(id,data,option)
        res.status(200).json({mesage:"Update Successfully",data: result })
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/delete/:id').delete(auth, async (req, res) => {
    try {
        const id = req.params.id
        const result = await Oder.findByIdAndDelete(id)
        res.status(200).json({mesage:"Delete Successfully",data: result })
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

module.exports = router;