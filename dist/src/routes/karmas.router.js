"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.karmaRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
// Global Config
exports.karmaRouter = express_1.default.Router();
exports.karmaRouter.use(express_1.default.json());
// GET
exports.karmaRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const karmas = (yield ((_a = database_service_1.collections.karmas) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
        res.status(200).send(karmas);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.karmaRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const karma = (yield ((_c = database_service_1.collections.karmas) === null || _c === void 0 ? void 0 : _c.findOne(query)));
        if (karma) {
            res.status(200).send(karma);
        }
    }
    catch (error) {
        res
            .status(404)
            .send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// POST
exports.karmaRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        console.log("Post request body:", req.body);
        const newKarma = req.body;
        newKarma.log_time = (_d = newKarma.log_time) !== null && _d !== void 0 ? _d : Date.now();
        const result = yield ((_e = database_service_1.collections.karmas) === null || _e === void 0 ? void 0 : _e.insertOne(newKarma));
        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// PUT
exports.karmaRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    const id = (_f = req === null || req === void 0 ? void 0 : req.params) === null || _f === void 0 ? void 0 : _f.id;
    try {
        const updatedKarma = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_g = database_service_1.collections.karmas) === null || _g === void 0 ? void 0 : _g.updateOne(query, { $set: updatedKarma }));
        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
// DELETE
exports.karmaRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    const id = (_h = req === null || req === void 0 ? void 0 : req.params) === null || _h === void 0 ? void 0 : _h.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_j = database_service_1.collections.karmas) === null || _j === void 0 ? void 0 : _j.deleteOne(query));
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
