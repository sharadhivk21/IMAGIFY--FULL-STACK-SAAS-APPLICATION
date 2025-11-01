import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    payment: { type: Boolean, default: false },
    date: { type: Number }
})

//checks if there already exists a user model first and only creates one if it doesnt exist and creates a model for the user.
const transactionModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema)

export default transactionModel;
//we use this to creat different APIS that enables the user to login, logout, buy credits etc.