const Data = require("../models/data");

const getData = async (req, res) => {
  await Data.findOne({ id: "Root" })
    .then((allData) => {
      res.status(200).json({ Data: allData });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addNewData = async (req, res) => {
  const data = new Data({
    id: req.body.id,
    name: req.body.name,
    isFolder: req.body.isFolder,
    items: req.body.items,
  });

  data
    .save()
    .then((savedData) => {
      res.json({ Data: savedData });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateData = async (req, res) => {
  Data.findByIdAndUpdate(
    req.body._id,
    {
      $set: { items: req.body.items },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      res.status(422).json({ error: err });
    } else {
      res.json({ Data: result });
    }
  });
};

module.exports = { getData, addNewData, updateData };
