import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URL;


export default uri;
