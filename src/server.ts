import app from "./config/app.config";
import dotenv from 'dotenv';
import connectDB from './config/db';
import colors  from 'colors';

dotenv.config();
// connect DB
connectDB();

// Defining Port
const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(colors.green.bold.underline((`Server running on port ${PORT}`)));
});
