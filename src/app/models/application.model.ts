export interface Application {
  id?: number;
  customer: {
    name: string;
    age: number;
    job: string;
    income: number;
  };
  item: {
    name: string;
    type: string;
    price: number;
  };
  documents: {
    ktp: string | null;   
    kk: string | null;
    paySlip: string | null;
    npwp: string | null;
  };
  status: 'Pending' | 'Survey' | 'Approved' | 'Rejected';
}
