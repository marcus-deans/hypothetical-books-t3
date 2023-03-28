import type { Session } from "next-auth";
import { api } from "./api";


export function getUserName(session: Session | null): string {
    if(!session){
        return "not authenticated";
    }
    if(session.user?.id){
        const user = api.users.getById.useQuery({id: session.user.id});
        if(user.data){
            return user.data.name;
        }
        return "No User";
    }
    return session.user?  "User is Present" : "No User Present"
}

export function getUserRole(session: Session | null): string {
    if(!session){
        return "not authenticated";
    }
    if(session.user?.id){
        const user = api.users.getById.useQuery({id: session.user.id});
        if(user.data){
            return user.data.role;
        }
        return "No User";
    }
    return session.user?  "User is Present" : "No User Present"
}