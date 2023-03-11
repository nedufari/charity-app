import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../../user/roles.enum";
import { ROLES_KEY } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY,[
            //context is pointing the location and methods where the roleguard would be used 
            context.getHandler(), 
            context.getClass()
    
        ])
        if (!requiredRoles){
            return true; //that means it is authoroized to have access into that route if the guard is left empty or not given
        }

        const {user} =context.switchToHttp().getRequest(); //use object disconstruction to get the user from the request

        //check to see if the role assigned to a particular user corresponds to the role in the role quard and if it does return true 
        return requiredRoles.some((role)=>user.role?.includes(role))
}
}