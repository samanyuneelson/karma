import { ObjectId } from "mongodb";

export default class Karma {
  constructor(
    public title: string,
    public label: string,
    public description: string,
    public isComplete: string,
    public duration?: number,
    public log_time?: number
  ) {}
}
