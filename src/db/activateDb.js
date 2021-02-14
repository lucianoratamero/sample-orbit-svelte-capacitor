import db, { backupDb, coordinator } from "./index";
import MoonRepository from "./repositories/MoonRepository";
import PlanetRepository from "./repositories/PlanetRepository";

const seedDb = async () => {
  await db.update((t) => seed.map((record) => t.addRecord(record)));

  const planets = await PlanetRepository.findRecords();
  console.log("planets in db - after update", planets);

  const moons = await MoonRepository.findRecords();
  console.log("moons in db - after update", moons);
}

export default async () => {
  // wait for the db to activate
  await db.activated;

  // pull all data from backupDb and sync it with the db
  const transform = await backupDb.pull((q) => q.findRecords());
  await db.sync(transform);

  const planets = await PlanetRepository.findRecords();
  console.log("planets - loaded from backupDb", planets);

  const moons = await MoonRepository.findRecords();
  console.log("moons - loaded from backupDb", moons);

  // activates sync between db (memory) and backupDb (indexedDB)
  await coordinator.activate();

  // populates the DB. if you want to test the db by itself, comment this
  await seedDb();
};

const seed = [
  {
    type: "planet",
    id: "8a4f17a0-307a-4277-ade7-53bbd758baa9",
    attributes: {
      name: "Jupiter",
      classification: "gas giant",
      atmosphere: true,
    },
  },
  {
    type: "planet",
    id: "26186d8b-b01e-4e92-8223-19931c9b9096",
    attributes: {
      name: "Earth",
      classification: "terrestrial",
      atmosphere: true,
    },
  },
  {
    type: "planet",
    id: "e1a336fc-840f-4981-a5b4-2c2d033d9399",
    attributes: {
      name: "Venus",
      classification: "terrestrial",
      atmosphere: true,
    },
  },
  {
    type: "moon",
    id: "cd735cb8-2af9-446e-ae6f-d582fae63347",
    attributes: {
      name: "Io",
    },
    relationships: {
      planet: {
        data: { type: "planet", id: "8a4f17a0-307a-4277-ade7-53bbd758baa9" },
      },
    },
  },
  {
    type: "moon",
    id: "e799a425-fa15-41fb-917b-71cdab743723",
    attributes: {
      name: "Europa",
    },
    relationships: {
      planet: {
        data: { type: "planet", id: "8a4f17a0-307a-4277-ade7-53bbd758baa9" },
      },
    },
  },
  {
    type: "moon",
    id: "e435e8fd-1423-4239-a6e7-aa04c028bae1",
    attributes: {
      name: "The Moon",
    },
    relationships: {
      planet: {
        data: { type: "planet", id: "26186d8b-b01e-4e92-8223-19931c9b9096" },
      },
    },
  },
];
