import { ObjectId } from "mongodb";

export default class Karma {
  constructor(
    public title: string,
    public label: string,
    public description: string,
    public isComplete: string,
    public list: string,
    public repeat?: string,
    public myDay?: boolean,
    public duration?: number,
    public log_time?: number
  ) {}
}

export class KarmaList {
  constructor(public listName: string) {}
}
