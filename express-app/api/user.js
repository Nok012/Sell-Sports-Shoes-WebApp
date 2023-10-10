const expressFunction = require("express");
const router = expressFunction.Router();
const auth = require("../auth/authorize");
const User = require("../schema/user")

router.route('/gets').get( async (req, res) => {
  try {
    console.log(5)
      const result = await User.find()
      console.log(result)
      res.status(200).json(result)
  }
  catch (err){
      res.status(500).json({err:err.message})
  }
})

router.route('/get/:id').get(auth, async (req, res) => {
  try {
      const id = req.params.id
      const result = await User.findById(id)
      res.status(200).json(result)
  }
  catch (err){
      res.status(500).json({err:err.message})
  }
})

router.route('/create').post(auth, async (req, res) => {
  try {
      const user = new User(req.body)
      const result = await user.save()
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
      const result = await User.findByIdAndUpdate(id,data,option)
      res.status(200).json({mesage:"Update Successfully",data: result })
  }
  catch (err){
      res.status(500).json({err:err.message})
  }
})

router.route('/delete/:id').delete(auth, async (req, res) => {
  try {
      const id = req.params.id
      const result = await User.findByIdAndDelete(id)
      res.status(200).json({mesage:"Delete Successfully",data: result })
  }
  catch (err){
      res.status(500).json({err:err.message})
  }
})



module.exports = router;
