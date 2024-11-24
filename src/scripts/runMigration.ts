import { migrateProjects } from "../utils/migrateProjects";

const runMigration = async () => {
  try {
    await migrateProjects();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

runMigration();