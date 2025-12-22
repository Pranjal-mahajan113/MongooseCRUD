const mongoose = require("mongoose");

//----------Connecting database
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("connection done");
  })
  .catch((err) => {
    console.log(err);
  });

//----------Creating schema

const userSchema = mongoose.Schema({
  name: String,
  phone: Number,
  city: String,
  state: {
    type: String,
    default: "Gujarat",
  },
});

//-------------Creating Model

const User = new mongoose.model("user", userSchema);

// const user1 = new User({
//     name:"Pranjal",
//     phone:1234567890,
//     city:"Mumbai",

// })
// user1.save()

// const createDocument = async () => {
//   try {
//     const user1 = new User({
//       name: "Harry",
//       phone: 123457777,
//       city: "Banglore",
//       state: "Kartanka",
//     });

//     const user2 = new User({
//       name: "Peter",
//       phone: 12345777,
//       city: "Bharuch",
//       state: "Gujarat",
//     });

//     const user3 = new User({
//       name: "Lisa",
//       phone: 13456787,
//       city: "Jodhpur",
//       state: "Rajasthan",
//     });

//     const data = await User.insertMany([user1, user2, user3]);
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };
// createDocument();

//-----------------Reading document

// const getdocument = async () => {
//   try {
//     const data = await User.find();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };
// getdocument();

//--------Update document


const updateDocument = async(id) =>{
    try{
        const result = await User.updateOne({ _id:id},{$set:{city:"Delhi"}})
        console.log(result)

    }catch(err){
        console.log(err);

    }


}

updateDocument("694900068fe1bffa0a9442c5")