const mongoose = require('mongoose')
const validator = require('validator')

//!connection Creation
mongoose.connect(
   "mongodb://localhost:27017/channel", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex:true
}
).then(() => {
   console.log('Connection Successful')
}).catch((err) => {
   console.log(err)
})

//! Create Schema
//* Schema Defines the Structure of the Document, default values , validatords

const playlistSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim:true,
      minlength:[2, 'minimum 2letters'],
      maxlength:30
   },
   ctype:{
      type:String,
      required:true,
      lowercase:true,
      enum:['frontend' , 'backend' , 'database']
   },
   Tutorials: {
      type:Number,
      // validate(value){
      //    if(value < 0){
      //       throw new Error('tutorials count should not negative')
      //    }
      // }
// custom validation 

      validate:{
         validator:function(value){
            return value.length < 0
         },
         message : 'tutorials count should not negative'
      }
   },
   author: String,
   email: {
      type: String,
      required:true,
      unique:true,
      validate(value){
         if(!validator.isEmail(value)){
            throw new Error('Email is Invalid')
         }
      }
   },
   active: Boolean,
   data: {
      type: Date,
      default: Date.now
   }
})

//! Create Model
//? Wrapper on the mongoose Schema, creating query, updating, deleting
//* Curd Operations

const Playlist = new mongoose.model('Playlist', playlistSchema)

//! create document and insert document 
//? using async await

const createDocument = async () => {
   try {
      // const jsPlaylist = new Playlist({
      //    name: 'JavaScript',
      //    ctype: 'Front End',
      //    Tutorials: 30,
      //    author: 'John Doe',
      //    active: true,
      // })

      // const mongoPlaylist = new Playlist({
      //    name: 'MonoDB',
      //    ctype: 'DataBase',
      //    Tutorials: 10,
      //    author: 'John Doe',
      //    active: true,
      // })

      const mongoosePlaylist = new Playlist({
         name: 'Native',
         ctype: 'backend',
         Tutorials: 20,
         author: 'John Doe',
         email:'tiwariatul9526@gmail.com',
         active: true,
      })

      // const expressPlaylist = new Playlist({
      //    name: 'Express JS',
      //    ctype: 'FrameWork BackEnd',
      //    Tutorials: 20,
      //    author: 'John Doe',
      //    active: true,
      // })

      const result = await Playlist.insertMany(
         [mongoosePlaylist]
      )
      console.log(result)
   } catch (err) {
      console.log(err)
   }
}

createDocument()

// Read Document in mongoose

const getDocument = async () => {
   try {
      const result = await Playlist
         .find({ author: 'John Doe' })
         .select({ name: 1 })
         .sort({ name: 1 })
      // .countDocuments()
      // .limit(1)
      console.log(result)
   } catch (err) {
      console.log(err)
   }
}
// getDocument()


// update the document 

const updateDocument = async (_id) => {
   try {
      const result = await Playlist.findByIdAndUpdate({ _id }, {
         $set: {
            name: 'Javascript'
         }
      }, {
         new: true,
         useFindAndModify: false
      })
      console.log(result)
   } catch (err) {
      console.log(err)
   }
}

// updateDocument('605992f3985ebf09ccc8b0c8')


//! Delete document

const deleteDocument = async (_id) => {
   try {
      const result = await Playlist.findByIdAndDelete({ _id })
      console.log(result)
   } catch (err) {
      console.log(err)
   }
}

// deleteDocument('605992f3985ebf09ccc8b0c9')