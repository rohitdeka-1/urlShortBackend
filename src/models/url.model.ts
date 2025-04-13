
import mongoose, {Schema} from "mongoose";

const urlSchema = new Schema(
    {
        shortId:{
            type: String,
            required: true,
            unique: true
        },
        redirectURL:{
            type: String,
            required: true,
        },
        visitHistory: [{
            timeStamp: {
                type: Date,
                default: new Date(),
            }
        }],
        visitedCount:{
            type:Number,
            default: 0,
        }
    },  
    {
        timestamps:true,
    }
)

const Url = mongoose.model("Url",urlSchema);

export default Url;