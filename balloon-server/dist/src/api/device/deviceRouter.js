"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
const express_1 = __importDefault(require("express"));
const typescript_ioc_1 = require("typescript-ioc");
const deviceController_1 = require("./deviceController");
const urlPath = '/device';
const router = express_1.default.Router();
exports.deviceRouter = router;
const greeterController = typescript_ioc_1.Container.get(deviceController_1.DeviceController);
router.get(urlPath, (req, res) => {
    greeterController.get(req, res);
});
