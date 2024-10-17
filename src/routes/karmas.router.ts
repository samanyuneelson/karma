// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { Karma } from "../models/";

interface KarmaUpdator extends Karma {
  _id?: number;
}

// Global Config
export const karmaRouter = express.Router();

karmaRouter.use(express.json());

// GET
karmaRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const karmas: Karma[] = (await collections.karmas
      ?.find<Karma>({})
      .toArray()) as Karma[];

    res.status(200).send(karmas);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

karmaRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const karma = (await collections.karmas?.findOne<Karma>(query)) as Karma;

    if (karma) {
      res.status(200).send(karma);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
karmaRouter.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Post request body:", req.body);
    const newKarma = req.body as Karma;
    newKarma.log_time = newKarma.log_time ?? Date.now();
    const result = await collections.karmas?.insertOne(newKarma);

    result
      ? res.status(201).send({
          message: `Successfully created a new game with id ${result.insertedId}`,
          _id: result.insertedId,
        })
      : res.status(500).send("Failed to create a new game.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// PUT

karmaRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedKarma: KarmaUpdator = req.body as Karma;
    delete updatedKarma._id;
    const query = { _id: new ObjectId(id) };

    const result = await collections.karmas?.updateOne(query, {
      $set: updatedKarma,
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

karmaRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.karmas?.deleteOne(query);

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
