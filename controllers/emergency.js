const catchAsync = require('../utils/catchAsync');
const AppExceptions = require('../utils/AppExceptions'); 
const Emergency = require("../models/emergency");
const Filter = require('../utils/filter');


    exports.createEmergency = catchAsync(async (req, res, next) => {
      let emergency = await Emergency.create({
        name: req.body.name,
        number: req.body.number,
        description: req.body.description
      });
      res.status(201).json({
        status: "Success",
        data: emergency
      });
    });

    exports.getEmergency = catchAsync(async (req, res, next) => {
      let foundEmergency = await Emergency.findById(req.params.id).select("-__v");
      if (!foundEmergency) {
        return next(new AppExceptions(`No emergency by this Id ${req.params.id}`, 404));
      }
      res.status(200).json({
        status: "success",
        data: foundEmergency
      });
    });

    exports.getAllEmergencies = catchAsync(async (req, res, next) => {
      let foundEmergencies = Emergency.find().select("-__v");
      let filter = new Filter(foundEmergencies, req.query).filter().limitFields().sort().paginate().query;
      foundEmergencies = await filter;
      res.status(200).json({
        status: "success",
        data: foundEmergencies
      });
    });

    exports.updateEmergency = catchAsync(async (req, res, next) => {
      let updatedEmergency = await Emergency.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedEmergency) {
        return next(new AppExceptions(`No emergency by this Id ${req.params.id}`, 404));
      }
      res.status(200).json({
        status: "success",
        data: updatedEmergency
      });
    });

    exports.deleteEmergency = catchAsync(async (req, res, next) => {
      let deletedEmergency = await Emergency.findByIdAndDelete(req.params.id);
      if (!deletedEmergency) {
        return next(new AppExceptions(`No emergency by this Id ${req.params.id}`, 404));
      }
      res.status(200).json({
        status: "Success",
        data: deletedEmergency
      });
    });