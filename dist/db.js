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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://tsamisyu:gkHQbGfViec2f3p7@cluster0.luy7jcy.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(uri);
const database = client.db('log');
const karmas = database.collection('karmas');
function getKarmas() {
    return __awaiter(this, void 0, void 0, function* () {
        const findResult = yield karmas.find({}).toArray();
        console.log('Found documents =>', findResult);
        return findResult;
    });
}
exports.default = getKarmas;
