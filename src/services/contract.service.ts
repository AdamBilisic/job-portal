import { Op } from "sequelize";
import { ContractDto } from "../types/contract.dto";
import { ContractStatus } from "../types/contract.enum";
import { Contract } from "../models/contract.model";

export class ContractService {

    constructor() { }

    getById(id: number): Promise<ContractDto> {
        return Contract.findOne({ where: { id } });
    }

    getUserActiveContracts(userId: number): Promise<Array<ContractDto>> {
        return Contract.findAll({
            where: {
                [Op.or]: [
                    { clientId: userId },
                    { contractorId: userId },
                ],
                status: {
                    [Op.not]: ContractStatus.TERMINATED
                }
            }
        });
    }

    // create(req: Request, res: Response) {
    //     Contract.create(req.body)
    //         .then((contract: ContractInterface) => {
    //             res.json(contract);
    //         })
    //         .catch((err: any) => {
    //             res.json(err);
    //         });
    // }

    // update(req: Request, res: Response) {
    //     Contract.update(req.body, {
    //         fields: Object.keys(req.body),
    //         where: { id: req.params.id }
    //     }).then((affectedRows: [number, ContractInterface[]]) => {
    //         res.json({
    //             affectedRows: Number(affectedRows)
    //         });
    //     }).catch((err: any) => {
    //         res.json(err);
    //     })
    // }

    // delete(req: Request, res: Response) {
    //     Contract.destroy({
    //         where: { id: req.params.id }
    //     })
    //         .then((removedRows: number) => {
    //             res.json({
    //                 removedRows: removedRows
    //             });
    //         }).catch((err: any) => {
    //             res.json(err);
    //         })

    // }
}