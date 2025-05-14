
export interface CustomerData { 

    id: number; 

    name: string; 

    email: string; 

    phone: string;


  } 




    export const isValidCustomerData = (value: CustomerData): value is CustomerData => {
        if (value.name)
          return true
        else
          return false;
      }
   

      export function validate(customerData:any){
          
        isValidCustomerData(JSON.parse(customerData)) ? true: false;

      }