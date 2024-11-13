import express from "express";
import colors from "colors";

const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(colors.bold.green(`Server running on port: ${port}`));
});
