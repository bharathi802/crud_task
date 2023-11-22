const express = require("express")
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await usermodel.find({})

    res.json({ success: true, data: data })
})

// create data
router.post("/create", async (req, res) => {
    const data  = new usermodel(req.body);
     await data.save();
    res.send({ success: true, message: "data save successfully...", data: data })
})

// update data
router.put("/update", async (req, res) => {
    const { id, ...rest } = req.body
    const data = await usermodel.updateOne({ _id: id }, rest)
    console.log(rest);
    res.send({ success: true, message: "update successful", data: data })
})

// delete data
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await usermodel.deleteOne({ _id: id })
    res.send({ success: true, message: "delete successfull", data: data })
})

module.exports = router;