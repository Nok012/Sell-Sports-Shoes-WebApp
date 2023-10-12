const fileSystem = require('fs');
const mongoose = require("mongoose");
const User = require("../schema/user")
const Shoe = require("../schema/shoe")
const Oder = require('../schema/oder')
const Review = require('../schema/review')

const setup = async (url, config) => {
    console.log('setup')
    mongoose.connect(url, config)

    let users = fileSystem.readFileSync('../mongodb/users.json', 'utf8');
    let userJsonDataset = JSON.parse(users);
    await User.insertMany(userJsonDataset).then(function(){ 
        console.log("Data inserted")  
    }).catch(function(error){ 
        console.log(error)      
    }); 

    let shoes = fileSystem.readFileSync('../mongodb/shoes.json', 'utf8');
    let shoeJsonDataset = JSON.parse(shoes);
    await Shoe.insertMany(shoeJsonDataset).then(function(){ 
        console.log("Data inserted")  
    }).catch(function(error){ 
        console.log(error)      
    }); 

    let reviews = fileSystem.readFileSync('../mongodb/reviews.json', 'utf8');
    let reviewJsonDataset = JSON.parse(reviews);
    await Review.insertMany(reviewJsonDataset).then(function(){ 
        console.log("Data inserted")  
    }).catch(function(error){ 
        console.log(error)      
    }); 


    // demo oder ------------------------------------------------
    const shoe = await Shoe.find()
    const user = await User.find()
    var oders = new Oder({
        
        date: "22/10/2565",
        totalPrice: 10000,
        user: user[0],
        totalShoe:[{
            shoe: shoe[2],
            quantity: 2
        },
        {
            shoe: shoe[1],
            quantity: 2
        }],

      });
    oders.save()
     // demo oder --------------------------------------------------

    
}


module.exports = setup;

