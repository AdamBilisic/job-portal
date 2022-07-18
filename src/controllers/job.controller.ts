import { Router, Request, Response } from "express";
import { JobService } from "../services/job.service";
import { getProfile } from "../middleware/getProfile";
import { ProfileDto } from "../types/profile.dto";
import { ProfileService } from "src/services/profile.service";

export default class JobController {
    router: Router;

    constructor(private jobService: JobService, private profileService: ProfileService) {
        // Initialize router object
        this.router = Router({ mergeParams: true });
        
        this.router.get(
            "/unpaid",
            getProfile,
            async (req: Request, res: Response) => {
                const userId: number = (req as any).profile.id ;
                const jobs = await this.jobService.getUserUnpaidJobs(userId);
                res.json(jobs);
            }
        );

        this.router.post(
            "/:job_id/pay",
            getProfile,
            async (req: Request, res: Response) => {
                const jobId = +req.params.job_id;
                const user: ProfileDto = (req as any).profile ;
                const job = await this.jobService.getClientJobToPayById(jobId, user.id);
                if (!job) {
                    return res.status(404).end();
                }
                if (user.balance < job.price) {
                    return res.status(400).send("Not enough funds");
                }
            
                try {
                    await this.profileService.moveBalance(user.id, job);
                } catch(e) {
                    return res.status(400).send(e.message);
                }

                // Comment: shouldnt we close the contract if this was the last job?
            
                res.json();
            }
        );
    }

}
