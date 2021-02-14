import { v4 as uuidv4 } from "uuid";

import db from "../index";

class MoonRepository {
  schema = {
    attributes: {
      name: { type: "string" },
    },
    relationships: {
      planet: { type: "hasOne", model: "planet", inverse: "moons" },
    },
  };

  createRecord = async (formData) => {
    const newMoonRecord = {
      type: "moon",
      id: uuidv4(),
      attributes: {
        name: formData.get("name"),
      },
      relationships: {
        planet: { data: { type: "planet", id: formData.get("planetId") } },
      },
    };

    await db.update((t) => t.addRecord(newMoonRecord));
  };

  findRecords = async () =>
    await db.query((q) => q.findRecords("moon").sort("name"));

  removeRecordById = async (id) =>
    await db.update((t) => t.removeRecord({ type: "moon", id }));

  removeRecordsByPlanetId = async (planetId) => {
    const moons = await db.query((q) =>
      q
        .findRecords("moon")
        .filter({ relation: "planet", record: { type: "planet", id: planetId } })
    );
    await db.update((t) => moons.map((moon) => t.removeRecord(moon)));
  };
}

export default new MoonRepository();
