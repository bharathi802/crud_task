const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const port = process.env.PORT || 7000;
// const { resolveNaptr } = require("dns");

const app = express();
app.use(cors());
// body parser
app.use(bodyparser.urlencoded({ extended: true }));


// Usermodel schema

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    number: String,
})

const usermodel = mongoose.model("user",schemaData)

app.get("/", async (req, res) => {
    const data = await usermodel.find({})

    res.json({ success: true, data: data })
})

// create data
app.post("/create", async (req, res) => {
    const data  = new usermodel(req.body);
     await data.save();
    res.send({ success: true, message: "data save successfully...", data: data })
})

// update data
app.put("/update", async (req, res) => {
    const { id, ...rest } = req.body
    const data = await usermodel.updateOne({ _id: id }, rest)
    console.log(rest);
    res.send({ success: true, message: "update successful", data: data })
})

// delete data
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await usermodel.deleteOne({ _id: id })
    res.send({ success: true, message: "delete successfull", data: data })
})

// const userData = require("./router/userRouter");
// app.use("/api", userData);

mongoose.connect("mongodb://127.0.0.1:27017/crudtask")
    .then(() => {
        console.log("database connected");
        app.listen(port, () => console.log(`server port is ${port}`))
    })
    .catch((err) => console.log(err))