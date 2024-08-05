import { ObjectId } from "mongodb";

enum GradePoints {
  O = "O",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

interface Grades {
  [dates: string]: GradePoints;
}

export default class Tracker {
  constructor(
    public title: string,
    public grades: Grades,
    public id?: ObjectId
  ) {}
}
