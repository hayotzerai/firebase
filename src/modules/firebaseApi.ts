import { collection, query, where, getDocs ,doc,getDoc,addDoc} from "firebase/firestore"
import  {db}  from "../lib/firebase"


export const getCustomers = async() => {

    console.log("Connectiong to firebase")  
    const ref = collection(db,"customers");
    const snapshots = await getDocs(ref);
    return snapshots.docs;
  }

  export const getCustomer = async (id:number) =>{

    let customer = [];
    const q = query(collection(db, "customers"), where("id", "==", id));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if any documents were returned
    if (querySnapshot.empty) {
      customer.push({description:'No matching document found in',status:'0'})
      return customer; // No document found
    }

    // Since we limited to 1, the first document in the snapshot is the one we want
    const docSnapshot = querySnapshot.docs[0];

    console.log(`Found document: ID = "${docSnapshot.id}"`);

    return JSON.stringify(docSnapshot.data());
  }

  export const addCustomer = async (customerData:any) =>{

    let customer = [];
    let id = Number(customerData['id']);
    let addCustomer:boolean = await isCustomerExists(id); 


    // Check if any documents were returned
    if (addCustomer ){
      customer.push({description:'Customer already Exists in the database',status:'0'})
      return customer; // No document found
    }else{
       const docRef = await addDoc(collection(db, "customers"), customerData);
  customer.push({description:'Customer add suceessfully to the database',status: '1'})
 }


    return JSON.stringify(customer);
  }


  const isCustomerExists = async(id:number) => {
    
    const q = query(collection(db, "customers"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const docSnapshot = querySnapshot.docs[0];
    console.log(docSnapshot);
    if(docSnapshot  != undefined){
    console.log(docSnapshot.data());
    }
    if (querySnapshot.empty) {    
      return false;
    }
    return true;

  }


