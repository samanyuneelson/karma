"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GradePoints;
(function (GradePoints) {
    GradePoints["O"] = "O";
    GradePoints["A"] = "A";
    GradePoints["B"] = "B";
    GradePoints["C"] = "C";
    GradePoints["D"] = "D";
    GradePoints["E"] = "E";
    GradePoints["F"] = "F";
})(GradePoints || (GradePoints = {}));
class Tracker {
    constructor(title, grades, id) {
        this.title = title;
        this.grades = grades;
        this.id = id;
    }
}
exports.default = Tracker;
