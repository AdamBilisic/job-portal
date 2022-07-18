import { Op } from "sequelize";
import { ContractStatus } from "../types/contract.enum";
import { Contract } from "../models/contract.model";
import { Job } from "../models/job.model";
import { JobDto } from "../types/job.dto";
import { Sequelize } from "sequelize-typescript";

export class JobService {

    constructor() { }

    getClientJobToPayById(id: number, userId: number) {
        return Job.findOne({
            where: {
                id,
                paid: false
            },
            include: [
              {
                model: Contract,
                required: true,
                where: {
                    status: ContractStatus.IN_PROGRESS, // Comment: this was not completely specified byt I assume you can only pay when the contract is in_progress
                    clientId: userId,
                },
              },
            ],
        });
    }

    getUserUnpaidJobs(userId: number): Promise<Array<JobDto>> {
        return Job.findAll({
            include: [
              {
                model: Contract,
                required: true,
                where: {
                    status: ContractStatus.IN_PROGRESS,
                    [Op.or]: [
                        { clientId: userId },
                        { contractorId: userId },
                    ],
                },
                attributes: []
              },
            ],
        });
    }

    async getJobsAmountToPay(userId: number): Promise<number> {
        const totalAmount = await Job.findAll<any>({
            where: {
                paid: false,
            },
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('price')), 'total_amount'],
            ],
            include: [
                {
                  model: Contract,
                  required: true,
                  where: {
                        status: ContractStatus.IN_PROGRESS,
                        clientId: userId,
                  },
                  attributes: []
                },
            ],
            raw: true
          });
        return totalAmount[0].total_amount;
    }
}