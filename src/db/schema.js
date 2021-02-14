import { Schema } from "@orbit/data";

import MoonRepository from "./repositories/MoonRepository";
import PlanetRepository from "./repositories/PlanetRepository";

const schemaDefinition = {
  models: {
    planet: PlanetRepository.schema,
    moon: MoonRepository.schema,
  },
};

export default new Schema(schemaDefinition);
