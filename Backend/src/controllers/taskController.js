const Model = require("../models/taskModel");
const { findByIdAndUpdate } = require("../models/userModel");

exports.create = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // const id = user;

    // const isExistUser = await Model.findOne({ id });

    // if (!isExistUser) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User Not Found",
    //   });
    // }

    const data = {
      title,
      description,
      status,
    };

    const result = await Model.create(data);

    res.status(200).json({
      success: true,
      message: "Task create success",
      data: result,
    });
  } catch (error) {}
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Model.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Task Delete success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, status } = req.body;

    const isExistUser = await Model.findOne({ id });

    if (!isExistUser) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found",
      });
    }

    const newData = {
      title,
      description,
      status,
    };

    const result = await Model.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Task create success",
      data: result,
    });
  } catch (error) {}
};

exports.getAll = async (req, res) => {
  try {
    const result = await Model.find();

    res.status(200).json({
      success: true,
      message: "Fetched",
      data: result,
    });
  } catch (error) {}
};
