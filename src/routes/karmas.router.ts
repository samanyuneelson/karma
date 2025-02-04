// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { Karma, KarmaList } from "../models/";

interface KarmaUpdator extends Karma {
  _id?: number;
}

interface KarmaListUpdator extends KarmaList {
  _id?: number;
}

// Global Config
export const karmaRouter = express.Router();

karmaRouter.use(express.json());

// GET
karmaRouter.get("/karma", async (_req: Request, res: Response) => {
  try {
    const list = _req.query.list;
    console.log(list);
    const karmas: Karma[] = (await collections.karmas
      ?.find<Karma>({ list: { $eq: list } })
      .toArray()) as Karma[];

    res.status(200).send(karmas);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

karmaRouter.get("/karma/:id", async (req: Request, res: Response) => {
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

karmaRouter.get("/karmalist", async (req: Request, res: Response) => {
  try {
    const karmaList: KarmaList[] = (await collections.karmaList
      ?.find<KarmaList>({})
      .toArray()) as KarmaList[];

    res.status(200).send(karmaList);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// POST
karmaRouter.post("/karma", async (req: Request, res: Response) => {
  try {
    console.log("Post request body:", req.body);
    const newKarma = req.body as Karma;
    newKarma.log_time = newKarma.log_time ?? Date.now();
    const result = await collections.karmas?.insertOne(newKarma);

    result
      ? res.status(201).send({
          message: `Successfully created a new Karma with id ${result.insertedId}`,
          _id: result.insertedId,
        })
      : res.status(500).send("Failed to create a new karma list.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

karmaRouter.post("/karmalist", async (req: Request, res: Response) => {
  try {
    console.log("Post request body:", req.body);
    const newKarmaList = req.body as KarmaList;
    const result = await collections.karmaList?.insertOne(newKarmaList);

    result
      ? res.status(201).send({
          message: `Successfully created a new Karma list with id ${result.insertedId}`,
          _id: result.insertedId,
        })
      : res.status(500).send("Failed to create a new karma list.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// PUT
karmaRouter.put("/karma/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedKarma: KarmaUpdator = req.body as Karma;
    delete updatedKarma._id;
    const query = { _id: new ObjectId(id) };

    const result = await collections.karmas?.updateOne(query, {
      $set: updatedKarma,
    });

    result
      ? res.status(200).send(`Successfully updated karma with id ${id}`)
      : res.status(304).send(`Karma with id: ${id} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

karmaRouter.put("/karmalist/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedKarmaList: KarmaListUpdator = req.body as KarmaList;
    delete updatedKarmaList._id;
    console.debug(updatedKarmaList);
    const query = { _id: new ObjectId(id) };

    const result = await collections.karmaList?.updateOne(query, {
      $set: updatedKarmaList,
    });

    result
      ? res.status(200).send(`Successfully updated karmalist with id ${id}`)
      : res.status(304).send(`Karma list with id: ${id} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// DELETE

karmaRouter.delete("/karma/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.karmas?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed karma with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove karma with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Karma with id ${id} does not exist`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

karmaRouter.delete("/karmalist/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.karmaList?.deleteOne(query);

    // TO DO: need to also delete all the tasks in the list

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed karma list with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove karma list with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Karma list with id ${id} does not exist`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
