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
exports.trackerRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
// Global Config
exports.trackerRouter = express_1.default.Router();
exports.trackerRouter.use(express_1.default.json());
// GET
exports.trackerRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const trackers = (yield ((_a = database_service_1.collections.tracker) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
        res.status(200).send(trackers);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.trackerRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const traker = (yield ((_c = database_service_1.collections.tracker) === null || _c === void 0 ? void 0 : _c.findOne(query)));
        if (traker) {
            res.status(200).send(traker);
        }
    }
    catch (error) {
        res
            .status(404)
            .send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// POST
exports.trackerRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        console.log("Post request body:", req.body);
        const newTrack = req.body;
        const result = yield ((_d = database_service_1.collections.tracker) === null || _d === void 0 ? void 0 : _d.insertOne(newTrack));
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
exports.trackerRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const id = (_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.id;
    try {
        const updatedTrack = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_f = database_service_1.collections.tracker) === null || _f === void 0 ? void 0 : _f.updateOne(query, { $set: updatedTrack }));
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
exports.trackerRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const id = (_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield ((_h = database_service_1.collections.tracker) === null || _h === void 0 ? void 0 : _h.deleteOne(query));
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
