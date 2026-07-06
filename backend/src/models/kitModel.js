const mongoose = require("mongoose");

const kitSchema = new mongoose.Schema({

    kitName:{

        type:String,

        required:true,

        unique:true

    },

    description:{

        type:String,

        default:""

    },

    imageUrl:{

        type:String,

        default:""

    },

    createdBy:{

        type:String,

        default:""

    },

    components:[

        {

            componentName:String,

            quantity:Number

        }

    ]

},
{

timestamps:true

});

module.exports=

mongoose.model("Kit",kitSchema);