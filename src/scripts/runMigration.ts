import { migrateProjectsToSupabase } from "../utils/migrateProjects";

const runMigration = async () => {
  try {
    await migrateProjectsToSupabase();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

runMigration();