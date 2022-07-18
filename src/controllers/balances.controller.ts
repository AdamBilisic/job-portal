import { Router, Request, Response } from "express";
import { ProfileService } from "src/services/profile.service";
import { JobService } from "../services/job.service";

export default class BalanceController {
    router: Router;

    constructor(private jobService: JobService, private profileService: ProfileService) {

        // Initialize router object
        this.router = Router({ mergeParams: true });
        
        this.router.post(
            "/deposit/:userId", // Comment: why dont we use logged in user id to add balance to his account ?
            async (req: Request, res: Response) => {
                const balanceToDeposit = req.body.balance;
                const userId = +req.params.userId;
                const amountToPay = await this.jobService.getJobsAmountToPay(userId);

                if (balanceToDeposit > (amountToPay/4)) {
                    return res.status(400).send("Can't deposit more then 25% of total jobs to pay");
                }
            
                const user = await this.profileService.addBalance(userId, balanceToDeposit);
                res.json(user);
            }
        );
    }

}
