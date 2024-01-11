import { connect } from "mongoose";

const { DB_USER, DB_PASSWORD } = process.env

const url = `mongodb://${DB_USER}:${DB_PASSWORD}@mongo:27017/mongo?authSource=admin`;

const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
};

export const connectDb = async () => {
    await connect(url, options).then(() => console.log("Connected to MongoDB local"));
};