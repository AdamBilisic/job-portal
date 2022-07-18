import * as express from 'express';
import * as bodyParser from 'body-parser';
import ContractController from './controllers/contract.controller';
import JobController from './controllers/job.controller';
import BalanceController from './controllers/balances.controller';
import AdminController from './controllers/admin.controller';
import { JobService } from './services/job.service';
import { ContractService } from './services/contract.service';
import { ProfileService } from './services/profile.service';

const app = express();
app.use(bodyParser.json());

// Comment: services should be singletons and injected via DI
const [
    jobService,
    contractService,
    profileService
] = [
    new JobService(),
    new ContractService(),
    new ProfileService()
]


app.use("/contracts", new ContractController(contractService).router);
app.use("/jobs", new JobController(jobService, profileService).router);
app.use("/balances", new BalanceController(jobService, profileService).router);
app.use("/admin", new AdminController().router);

export default app;
