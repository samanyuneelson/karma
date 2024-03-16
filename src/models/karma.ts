import { ObjectId } from "mongodb";

export default class Karma {
  constructor(
      public title: string,
      public log_time: number,
      public duration: number,
      public category: string,
      public id?: ObjectId,
  ) {}
}
