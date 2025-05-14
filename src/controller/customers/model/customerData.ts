
import { isValidCustomerData , CustomerData} from './customerConvert'

  export function validateCustomerData(customerData:any){
    let resulet :boolean  = isValidCustomerData(customerData) ? true: false;
     return Promise.resolve(resulet);
 }

