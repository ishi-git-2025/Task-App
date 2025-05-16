import mongoose from 'mongoose';

const connect = async () => {
    try {
    console.log("Attempting to connect to db...");
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("connected to db")
} catch (error) {
    console.log("failed to connect with db...", error.message)
}
}

export default connect; 