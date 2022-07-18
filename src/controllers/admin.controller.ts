import { Router, Request, Response } from "express";
import { ProfileService } from "../services/profile.service";
import { getProfile } from "../middleware/getProfile";

export default class AdminController {
    router: Router;
    profileService: ProfileService;

    constructor() {
        // Initialize service objects
        this.profileService = new ProfileService();

        // Initialize router object
        this.router = Router({ mergeParams: true });
        
        this.router.get(
            "/best-profession",
            async (req: Request, res: Response) => {
                const { start, end } = req.query as any;
                if(!start || !end) {
                    return res.status(400).send("Start and end date is mandatory");
                }
                
                const bestProfession = await this.profileService.calculateBestProfession(
                    new Date(start),
                    new Date(end)
                );

                res.json(bestProfession);
            }
        );

        this.router.get(
            "/best-clients",
            async (req: Request, res: Response) => {
                const { start, end, limit } = req.query as any;
                if(!start || !end) {
                    return res.status(400).send("Start and end date is mandatory");
                }
                
                const bestClients = await this.profileService.calculateBestClients(
                    new Date(start),
                    new Date(end),
                    limit
                );

                res.json(bestClients);
            }
        );
    }

}
