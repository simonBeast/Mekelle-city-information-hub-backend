const AppExceptions = require('../utils/AppExceptions');
const CommunityBullet = require("../models/communityBullet");

exports.createCommunityBullet = async (req, res, next) => {

  console.log(req.file);
  if(req.file){
    req.body.picture = req.file.filename
  }

  try {
    const communityBullet = await CommunityBullet.create(req.body);
    res.status(201).json({
      status: "success",
      data: communityBullet
    });
  } catch (e) {
    return next(e);
  }
};

exports.getCommunityBullet = async (req, res, next) => {
  try {
    const communityBullet = await CommunityBullet.findById(req.params.id).select("-__v");
    if (!communityBullet) {
      return next(new AppExceptions(`No community bullet by this Id { ${req.params.id} }`, 404));
    }
    res.status(200).json({
      status: "success",
      data: communityBullet
    });
  } catch (e) {
    return next(e);
  }
};

exports.getAllCommunityBullets = async (req, res, next) => {
  try {
    const communityBullets = await CommunityBullet.find().select("-__v");
    res.status(200).json({
      status: "success",
      data: communityBullets
    });
  } catch (e) {
    return next(e);
  }
};

exports.updateCommunityBullet = async (req, res, next) => {
  try {
    const updatedCommunityBullet = await CommunityBullet.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(200).json({
      status: "success",
      data: updatedCommunityBullet
    });
  } catch (e) {
    return next(e);
  }
};

exports.deleteCommunityBullet = async (req, res, next) => {
  try {
    const deletedCommunityBullet = await CommunityBullet.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: deletedCommunityBullet
    });
  } catch (e) {
    return next(e);
  }
};