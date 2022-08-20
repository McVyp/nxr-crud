import AddUserForm from "./addUSerForm";
import UpdateUserForm from "./updateUSerForm";

export default function Form() {

    const flag= true;

   return(
    <div className='container mx-auto py-2'>
        {flag? <AddUserForm /> : <UpdateUserForm />}
    </div>
  
   )
}
