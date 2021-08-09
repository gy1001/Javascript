"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var db_1 = __importDefault(require("../config/db"));
var connection = mysql_1.default.createConnection(db_1.default);
var query = function (sql) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (error, results) {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
exports.default = query;
