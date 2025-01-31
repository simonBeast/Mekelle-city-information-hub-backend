const Filter = require('../utils/filter');
const catchAsync = require('../utils/catchAsync');
const AppExceptions = require('../utils/AppExceptions'); 
const Event = require("../models/event");

    exports.createEvent = catchAsync(async (req, res, next) => {

      if(req.file){
        req.body.picture = req.file.filename
      }
      
      let event = await Event.create({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        picture: req.body.picture
      });
      res.status(201).json({
        status: "Success",
        data: event
      });
    });

    exports.getEvent = catchAsync(async (req, res, next) => {
      let foundEvent = await Event.findById(req.params.id).select("-__v");
      if (!foundEvent) {
        return next(new AppExceptions(`No event found by this Id ${req.params.id}`, 404));
      }
      res.status(200).json({
        status: "success",
        data: foundEvent
      });
    });

    exports.getAllEvents = catchAsync(async (req, res, next) => {
      let foundEvents = Event.find().select("-__v");
      let filter = new Filter(foundEvents, req.query).filter().limitFields().sort().paginate().query;
      foundEvents = await filter;
      res.status(200).json({
        status: "success",
        data: foundEvents
      });
    });

    exports.updateEvent = catchAsync(async (req, res, next) => {
      let updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedEvent) {
        return next(new AppExceptions(`No event found by this Id ${req.params.id}`, 404));
      }
      res.status(200).json({
        status: "success",
        data: updatedEvent
      });
    });

    exports.deleteEvent = catchAsync(async (req, res, next) => {
      let deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
        return next(new AppExceptions(`No event found by this Id ${req.params.id}`, 404));
      }
      res.status(200).json({
        status: "Success",
        data: deletedEvent
      });
    });