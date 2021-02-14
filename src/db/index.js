import Coordinator, { SyncStrategy } from "@orbit/coordinator";
import MemorySource from "@orbit/memory";
import IndexedDBSource from "@orbit/indexeddb";

import schema from "./schema";

const db = new MemorySource({ schema });

const backupDb = new IndexedDBSource({
  schema,
  name: "backupDb",
  namespace: "solarsystem",
});

const coordinator = new Coordinator({
  sources: [db, backupDb],
});

const backupStoreSync = new SyncStrategy({
  source: "memory",
  target: "backupDb",
});

coordinator.addStrategy(backupStoreSync);

export default db;
export { backupDb, coordinator };
