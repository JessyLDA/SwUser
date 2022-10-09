import { getConnection } from "@models/sqlite/SqliteConn";
import { UsersDao } from "@models/sqlite/UsersDao";
export interface IUsers{
    name: string;
    apellido: string;
    email:string;
    password:string;
};
export class Users {
    private dao: UsersDao;
    public constructor(){
        getConnection()
        .then(conn=>{
            this.dao = new UsersDao(conn);
        })
        .catch(ex=>console.error(ex));
    }
    
    //Consultas----------------------------
    public getAllUsers(){
        return this.dao.getUsers()
    }

    public getUsersByIndex( index:number) {
         return this.dao.getUsersById({_id:index});  
    }

    public addUser( User:IUsers) {
      return this.dao.insertNewUser(User);
    }
    public updateUsers( index:number, User:IUsers){
        return this.dao.update({_id:index}, User);
    }

    public deleteUsers(index:number) {
       return this.dao.deleteUsers({_id:index});
    }
}