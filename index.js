const express = require("express");
const recruitersRouter = require("./routers/recruiters");
const candidatesRouter = require("./routers/candidate");
const userChatStateRouter = require("./routers/userChatState");
const MongoDbConnection = require("./dbInstance").MongoDbConnection;

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/recruiter", recruitersRouter);
app.use("/api/v1/candidate", candidatesRouter);
app.use("/api/v1/userChatState", userChatStateRouter);

const port = process.env.PORT || 8080;

app.use((err, req, res, next) => {
  console.log("err", err);
  if (err) {
    res.send(err).status(500);
  }

  // res.status(200).send("No error");
});

app.listen(port, () => {
  new MongoDbConnection();
  console.log(`Server is up on port ${port}.`);
});
