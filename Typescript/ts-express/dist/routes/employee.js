"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/getEmployee", function (req, res) {
  res.json({
      flag: 1,
      msg: 'No DB'
  });
});
router.post("/createEmployee", function (req, res) {
  res.json({
      flag: 1,
      msg: 'NO DB'
  });
});
exports.default = router;
