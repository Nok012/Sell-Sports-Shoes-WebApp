const expressFunction = require("express");
const router = expressFunction.Router();
const auth = require("../auth/authorize");
const Order = require("../schema/order")
const Shoe = require("../schema/shoe");
const { default: mongoose } = require("mongoose");



router.route('/gets').get(auth, async (req, res) => {
    try {
        const result = await Order.find()
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/get/:id').get(auth, async (req, res) => {
    try {
        const id = req.params.id
        const result = await Order.find({ userId: id }).exec();
        console.log(result)
        res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})

router.route('/create').post(auth, async (req, res) => {
    try {
       
        const order = new Order(req.body)  
        const option = {new:true}
        order.menuordering.forEach( async id => {
            const shoeId = await Shoe.findById(id)
            const data =await Shoe.findByIdAndUpdate(id,{quantity:shoeId.quantity-1},option)
            console.log(data)
        });

        const result = await order.save()
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
        const result = await Order.findByIdAndUpdate(id,data,option)
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
            await Order.findByIdAndUpdate(element._id,{quantity:element.quantity},option)
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
        const result = await Order.findByIdAndDelete(id)
        res.status(200).json({mesage:"Delete Successfully",data: result })
    }
    catch (err){
        res.status(500).json({err:err.message})
    }
})



module.exports = router;
