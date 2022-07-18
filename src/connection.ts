import { Sequelize } from "sequelize-typescript";
import { Contract } from "./models/contract.model";
import { Job } from "./models/job.model";
import { Profile } from "./models/profile.model";

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  logging: true,
  models: [Profile, Job, Contract],
});

export default connection;