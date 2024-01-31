const dotenv = require("dotenv");

dotenv.config();

const { DB_USER, DB_PASSWORD } = process.env;

const config = {
    mongodb: {
        url: `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017`,
        databaseName: "test",
    },
    migrationsDir: "migrations",
    changelogCollectionName: "changelog",
    migrationFileExtension: ".js",
    useFileHash: false,
    moduleSystem: "commonjs",
};

module.exports = config;
