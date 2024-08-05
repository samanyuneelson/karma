import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { Tracker } from "../models/";

// Global Config
export const trackerRouter = express.Router();

trackerRouter.use(express.json());

// GET
trackerRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const trackers: Tracker[] = (await collections.tracker
      ?.find<Tracker>({})
      .toArray()) as Tracker[];

    res.status(200).send(trackers);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

trackerRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const traker = (await collections.tracker?.findOne<Tracker>(
      query
    )) as Tracker;

    if (traker) {
      res.status(200).send(traker);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
trackerRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Post request body:", req.body);
    const newTrack = req.body as Tracker;
    const result = await collections.tracker?.insertOne(newTrack);

    result
      ? res
          .status(201)
          .send(`Successfully created a new game with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new game.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// PUT

trackerRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedTrack: Tracker = req.body as Tracker;
    const query = { _id: new ObjectId(id) };
    const key = Object.keys(updatedTrack.grades)[0];
    const tracker = (await collections.tracker?.findOne<Tracker>(
      query
    )) as Tracker;
    tracker.grades[`${key}`] = updatedTrack.grades[`${key}`];
    console.log(tracker);
    const result = await collections.tracker?.updateOne(query, {
      $set: tracker,
    });

    result
      ? res.status(200).send(`Successfully updated game with id ${id}`)
      : res.status(304).send(`Game with id: ${id} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// DELETE

trackerRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.tracker?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed game with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove game with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Game with id ${id} does not exist`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
