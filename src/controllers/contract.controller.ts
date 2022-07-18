import { Router, Request, Response } from "express";
import { ContractService } from "../services/contract.service";
import { getProfile } from "../middleware/getProfile";

export default class ContractController {
    router: Router;

    constructor(private contractService: ContractService) {

        // Initialize router object
        this.router = Router({ mergeParams: true });
        
        this.router.get(
            "/:id",
            getProfile,
            async (req: Request, res: Response) => {
                const id = +req.params.id;
                const userId: number = (req as any).profile.id ; // TODO:: fix typing
                const contract = await this.contractService.getById(id);
                if (!contract) {
                    return res.status(404).end();
                }

                if (contract.clientId !== userId && contract.contractorId !== userId) {
                    /* COMMENT:: depeding on wanted result we can also do this check
                       over the db and just return null if the userId doesnt match either
                       clientId or contractorId. However we loose information if the contract
                       actually exists.
                    */
                    return res.status(403).end();
                }
                res.json(contract);
            }
        );

        this.router.get(
            "/",
            getProfile,
            async (req: Request, res: Response) => {
                const userId: number = (req as any).profile.id ;
                const contracts = await this.contractService.getUserActiveContracts(userId);
                res.json(contracts);
            }
        );
    }

}
