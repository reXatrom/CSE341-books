import app from "./app.js";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("Error: PORT is not defined. Make sure your local npm script reference the .env file with --env-file=.env, or define the PORT in your hosted environment settings.");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});