export interface JobDto {
  id: number;
  contractId: number;
  description: string;
  price: number;
  paid: boolean;
  paymentDate: Date | null;
}
