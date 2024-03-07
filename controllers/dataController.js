const Data = require('../models/dataModel');

let addCount = 0;
let updateCount = 0;

async function addData(req, res) {
  try {
    const startTime = performance.now();
    const field = await Data.create(req.body);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    addCount++;
    res.status(200).json({ field, executionTime });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateData(req, res) {
  try {
    const startTime = performance.now();
    const { id } = req.params;
    const field = await Data.findByIdAndUpdate(id, req.body);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    if (!field) {
      return res.status(400).json({
        message: `Cannot find any field with ID ${id}`
      })
    }
    updateCount++;
    const updatedFields = await Data.findById(id);
    res.status(200).json({ updatedFields, executionTime });
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

async function getData(req, res) {
  try {
    const startTime = performance.now();
    const fields = await Data.find({});
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    res.status(200).json({ fields, executionTime });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function getCount(req, res) {
  res.status(200).json({ addCount, updateCount });
}

module.exports = { addData, updateData, getData, getCount };
