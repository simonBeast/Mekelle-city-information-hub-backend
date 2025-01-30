const Filter = require('../utils/filter');
const catchAsync = require('../utils/catchAsync');
const AppExceptions = require('../utils/AppExceptions');
const LocalBusiness = require("../models/localBusiness");

exports.createLocalBusiness = catchAsync(async (req, res, next) => {

  if(req.file){
    req.body.picture = req.file.filename
  }

  let localBusiness = await LocalBusiness.create({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description
  });
  res.status(200).json({
    status: "Success",
    data: localBusiness
  });
});

exports.getLocalBusiness = catchAsync(async (req, res, next) => {
  let foundBusiness = await LocalBusiness.findById(req.params.id).select("-__v");
  if (!foundBusiness) {
    return next(new AppExceptions(`No local business by this Id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: foundBusiness
  });
});

exports.getAllLocalBusinesses = catchAsync(async (req, res, next) => {
  let foundBusinesses = LocalBusiness.find().select("-__v");
  let filter = new Filter(foundBusinesses, req.query).filter().limitFields().sort().paginate().query;
  foundBusinesses = await filter;
  res.status(200).json({
    status: "success",
    data: foundBusinesses
  });
});

exports.updateLocalBusiness = catchAsync(async (req, res, next) => {
  let updatedLocalBusiness = await LocalBusiness.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updatedLocalBusiness) {
    return next(new AppExceptions(`No local business by this Id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: updatedLocalBusiness
  });
});

exports.deleteLocalBusiness = catchAsync(async (req, res, next) => {
  let deletedLocalBusiness = await LocalBusiness.findByIdAndDelete(req.params.id);
  if (!deletedLocalBusiness) {
    return next(new AppExceptions(`No local business by this Id ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: "Success",
    data: deletedLocalBusiness
  });
});