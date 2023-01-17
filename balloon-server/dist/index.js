"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = require("./api");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use('/api', api_1.deviceRouter);
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
