const AppExceptions = require("../utils/AppExceptions")
const CityService = require("../models/cityService");

exports.createCityService = async (req, res, next) => {
  if(req.file){
    req.body.picture = req.file.filename
  }
  try {
    const newCityService = await CityService.create(req.body);
    res.status(201).json({
      status: "Success",
      data: newCityService
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

exports.getCityService = async (req, res, next) => {
  try {
    const cityService = await CityService.findById(req.params.id);
    if (!cityService) {
      return next(new AppExceptions("No city service found with this ID", 404));
    }
    res.status(200).json({
      status: "Success",
      data: cityService
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

exports.getAllCityServices = async (req, res, next) => {
  try {

    const cityServices = await CityService.find();

    
    res.status(200).json({
      status: "Success",
      data: cityServices
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

exports.updateCityService = async (req, res, next) => {
  try {
    const updatedCityService = await CityService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCityService) {
      return next(new AppExceptions("No city service found with this ID", 404));
    }
    res.status(200).json({
      status: "Success",
      data: updatedCityService
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

exports.deleteCityService = async (req, res, next) => {
  try {
    const deletedCityService = await CityService.findByIdAndDelete(req.params.id);
    if (!deletedCityService) {
      return next(new AppExceptions("No city service found with this ID", 404));
    }
    res.status(200).json({
      status: "Success",
      data: deletedCityService
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};