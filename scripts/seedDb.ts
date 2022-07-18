import { ProfileType } from "../src/types/profile.enum";
import { Contract } from "../src/models/contract.model";
import { Job } from "../src/models/job.model";
import { Profile } from "../src/models/profile.model";
import { ContractStatus } from "../src/types/contract.enum";
// import  { v4 as uuidv4 } from 'uuid';
import connection from "../src/connection";

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  await connection.sync({ force: true });

  const users = [
    {
      id: 1,
      firstName: 'Harry',
      lastName: 'Potter',
      profession: 'Wizard',
      balance: 1150,
      type: ProfileType.CLIENT
    }, 
    {
      id: 2,
      firstName: 'Mr',
      lastName: 'Robot',
      profession: 'Hacker',
      balance: 231.11,
      type: ProfileType.CLIENT
    },
    {
      id: 3,
      firstName: 'John',
      lastName: 'Snow',
      profession: 'Knows nothing',
      balance: 451.3,
      type: ProfileType.CLIENT
    },
    {
      id: 4,
      firstName: 'Ash',
      lastName: 'Kethcum',
      profession: 'Pokemon master',
      balance: 1.3,
      type: ProfileType.CLIENT
    },
    {
      id: 5,
      firstName: 'John',
      lastName: 'Lenon',
      profession: 'Musician',
      balance: 64,
      type: ProfileType.CONTRACTOR
    },
    {
      id:  6,
      firstName: 'Linus', 
      lastName: 'Torvalds', 
      profession: 'Programmer',
      balance: 1214,
      type: ProfileType.CONTRACTOR
    },
    {
      id: 7,
      firstName: 'Alan',
      lastName: 'Turing',
      profession: 'Programmer',
      balance: 22,
      type: ProfileType.CONTRACTOR
    },
    {
      id: 8,
      firstName: 'Aragorn',
      lastName: 'II Elessar Telcontarvalds',
      profession: 'Fighter',
      balance: 314,
      type: ProfileType.CONTRACTOR
    }
  ];

  const contracts = [
    {
      id: 1,
      terms: 'bla bla bla',
      status: ContractStatus.TERMINATED,
      clientId: 1,
      contractorId: 5
    },
    {
      id: 2,
      terms: 'bla bla bla',
      status: ContractStatus.IN_PROGRESS,
      clientId: 1,
      contractorId: 6,
    },
    {
      id: 3,
      terms: 'bla bla bla',
      status: ContractStatus.IN_PROGRESS,
      clientId: 2,
      contractorId: 6
    },
    {
      id:  4,
      terms: 'bla bla bla',
      status: ContractStatus.IN_PROGRESS,
      clientId: 2,
      contractorId: 7,
    },
    {
      id: 5,
      terms: 'bla bla bla',
      status: ContractStatus.NEW,
      clientId: 3,
      contractorId: 8,
    },
    {
      id: 6,
      terms: 'bla bla bla',
      status: ContractStatus.IN_PROGRESS,
      clientId: 3,
      contractorId: 7,
    },
    {
      id: 7,
      terms: 'bla bla bla',
      status: ContractStatus.IN_PROGRESS,
      clientId: 4,
      contractorId: 7,
    },
    {
      id: 8,
      terms: 'bla bla bla',
      status: ContractStatus.IN_PROGRESS,
      clientId: 4,
      contractorId: 6,
    },
    {
      id: 9,
      terms: 'bla bla bla',
      status: ContractStatus.IN_PROGRESS,
      clientId: 4,
      contractorId: 8,
    },
  ];

  const jobs = [
    {
      description: 'work',
      price: 200,
      contractId: 1,
    },
    {
      description: 'work',
      price: 201,
      contractId: 2,
    },
    {
      description: 'work',
      price: 202,
      contractId: 3,
    },
    {
      description: 'work',
      price: 200,
      contractId: 4,
    },
    {
      description: 'work',
      price: 200,
      contractId: 7,
    },
    {
      description: 'work',
      price: 2020,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      contractId: 7,
    },
    {
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      contractId: 2,
    },
    {
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-16T19:11:26.737Z',
      contractId: 3,
    },
    {
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-17T19:11:26.737Z',
      contractId: 1,
    },
    {
      description: 'work',
      price: 200,
      paid:true,
      paymentDate:'2020-08-17T19:11:26.737Z',
      contractId: 5,
    },
    {
      description: 'work',
      price: 21,
      paid:true,
      paymentDate:'2020-08-10T19:11:26.737Z',
      contractId: 1,
    },
    {
      description: 'work',
      price: 21,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      contractId: 2,
    },
    {
      description: 'work',
      price: 121,
      paid:true,
      paymentDate:'2020-08-15T19:11:26.737Z',
      contractId: 3,
    },
    {
      description: 'work',
      price: 121,
      paid:true,
      paymentDate:'2020-08-14T23:11:26.737Z',
      contractId: 3,
    },
  ] as any; // TODO:: we can remove any if we redefine paymentDate as Date
  try {
    await Promise.all([
      Profile.bulkCreate(users),
      Contract.bulkCreate(contracts),
      Job.bulkCreate(jobs)
    ]);
  } catch (e) {
    console.log(e);
  }
}
