import { v4 as uuidv4 } from "uuid";

import db from "../index";
import MoonRepository from "./MoonRepository";

class PlanetRepository {
  schema = {
    attributes: {
      name: { type: "string" },
      classification: { type: "string" },
      atmosphere: { type: "boolean" },
    },
    relationships: {
      moons: { type: "hasMany", model: "moon", inverse: "planet" },
    },
  };

  createRecord = async (formData) => {
    const newPlanetRecord = {
      type: "planet",
      id: uuidv4(),
      attributes: {
        name: formData.get("name"),
        classification: formData.get("classification"),
        atmosphere: Boolean(formData.get("atmosphere")),
      },
    };

    await db.update((t) => t.addRecord(newPlanetRecord));
  };

  findRecords = async () =>
    await db.query((q) => q.findRecords("planet").sort("name"));

  removeRecordById = async (id) => {
    await MoonRepository.removeRecordsByPlanetId(id);
    await db.update((t) => t.removeRecord({ type: "planet", id }));
  };
}

export default new PlanetRepository();
