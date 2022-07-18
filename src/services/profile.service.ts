import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Contract } from "../models/contract.model";
import { Job } from "../models/job.model";
import { Profile } from "../models/profile.model";

export class ProfileService {

    constructor() { }

    getById(id: number) {
        return Profile.findOne({ where: { id } });
    }

    async moveBalance(userIdFrom: number, job: Job) {
        const balance = job.price;
        const fromUser = await this.getById(userIdFrom);
        const toUser = await this.getById(job.Contract.contractorId);

        const t = await Profile.sequelize.transaction();    
        try {
            fromUser.balance -= balance;
            await fromUser.save({ transaction: t });

            toUser.balance += balance;
            await toUser.save({ transaction: t });
          
            job.paid = true;
            job.paymentDate = new Date();
            await job.save({ transaction: t })

            await t.commit();
          } catch (e) {
            await t.rollback();
            throw e;
          }
    }

    async addBalance(userId: number, balance: number): Promise<Profile> {
        const user = await this.getById(userId);
        user.balance += balance;
        user.save();
        return user;
    }

    async calculateBestProfession(startDate: Date, endDate: Date): Promise<Profile> {
        const results = await Profile.findAll<any>({
            group: ['profession'],
            attributes: [
                "profession",
                [Sequelize.fn('sum', Sequelize.col('Contractor.Job.price')), 'sum'],
            ],
            include: [
                {
                  model: Contract,
                  as: "Contractor",
                  required: true,
                  include: [{
                    model: Job,
                    required: true,
                    where: {
                        paymentDate: {
                            [Op.gte]: startDate,
                            [Op.lte]: endDate,
                        }
                    },
                    attributes: [
                        "price"
                    ]
                  }],
                  attributes: []
                },
            ],
            order: Sequelize.literal("sum DESC"),
            raw: true
          });

        return results[0].profession;
    }

    async calculateBestClients(startDate: Date, endDate: Date, limit: number = 2): Promise<Array<Profile>> {
        const results = await Profile.findAll<any>({
            attributes: {
                include: [[Sequelize.fn('sum', Sequelize.col('Client.Job.price')), 'sum']],
            },
            include: [
                {
                  model: Contract,
                  as: "Client",
                  required: true,
                  include: [{
                    model: Job,
                    required: true,
                    where: {
                        paymentDate: {
                            [Op.gte]: startDate,
                            [Op.lte]: endDate,
                        }
                    },
                    attributes: [
                        "price"
                    ]
                  }],
                  attributes: []
                },
            ],
            limit,
            order: Sequelize.literal("sum DESC"),
            raw: true,
          });
        return results;
    }
}