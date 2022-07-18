import { ContractStatus } from "./contract.enum";

export interface ContractDto {
  id: number;
  clientId: number;
  contractorId: number;
  terms: string;
  status: ContractStatus
}

