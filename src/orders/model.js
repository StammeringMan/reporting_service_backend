import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
    invoiceNumber: {
        type: String
    },
    orderNumber: {
        type: String
    },
    orderAmount: {
        type: Number
    },
    listItems: [
        {
            name: String,
            amount: Number,
            tax: Number
        }
    ]
})

export default mongoose.model('Order', OrderSchema)