import { Roles } from "./roles.enum"

export interface UserDetails{
    id:string
    fullname:string
    email:string
    address:string
    phone:string
    agencyName:string
    body:string
    header:string
    account1:string
    account2:string
    role:Roles
    
}
//delibrately ommitted the password cuz i dont want it out
// this acts as a response for the user when created and registered and as the response for the helper function getuser