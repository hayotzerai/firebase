import { Request, Response, NextFunction } from "express";
import { validateCustomerData } from "../model/customerData";
import {getCustomers,getCustomer,addCustomer} from "../../../modules/firebaseApi"





export async function customers(req:Request , res:Response, next:NextFunction){
    const customer:boolean = await validateCustomerData(req.body);

    if(customer){
        res.status(200).json({status:'Customer validate successfully'});
    }else{

        res.status(503).json({status:'Customer validation fail'});;

    }
    
    
}

export async function cust(req:Request , res:Response, next:NextFunction){
    let p =await getCustomers();
    console.log(p);
    return res.status(200).json(p);

    
    
}

export async function get(req:Request , res:Response, next:NextFunction){
  
    let id =  0;
    try{
       id = Number(req.params.id);
    }
    catch(error)
    {
       console.error(error);
       return res.status(200).json({'error':error});
    }
    return res.status(200).json(await getCustomer(id));
    
}

export async function set(req:Request , res:Response, next:NextFunction){
  
    const customer:boolean = await validateCustomerData(req.body);
    if(customer){
      let ressults =  await addCustomer(req.body);
       return res.status(200).json(ressults);
    }else{

        return res.status(503).json({status:'0',description:'Customer validation fail'});;
    }
}






