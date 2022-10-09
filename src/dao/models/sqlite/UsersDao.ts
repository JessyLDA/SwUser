import { IUsers } from "../entities/Users";
import { AbstractDao } from "./AbstractDao";
import sqlite from "sqlite";

export class UsersDao extends AbstractDao<IUsers>{
    public constructor(db:sqlite.Database){
      super('USERS', db as sqlite.Database);
      super.exec('CREATE TABLE IF NOT EXISTS USERS('
      + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
      + ' name TEXT'
      + ' apellido TEXT'
      + ' email TEXT'
      + ' password TEXT);').then().catch(e=>console.error(e));
    }
    public async getUsers() {
       return super.findAll()
    }

    public async getUsersById( identifier : Partial<IUsers> ){
      try{
        const result = await super.findByID(identifier);
        return result;
      }catch( ex : unknown) {
        console.log("UsersDao sqlite:", (ex as Error).message);
        throw ex;
      }
    }

    public async insertNewUser( newUser: IUsers) {
      try{
        const result = await super.createOne(newUser);
        return result;
      }catch( ex: unknown) {
        console.log("UsersDao sqlite:", (ex as Error).message);
        throw ex;
      }
    }

    public async updateUsers( updateUser: IUsers) {
      try {
        const {_id, ...updateObject} = updateUser;
        const result = await super.update({_id}, updateObject);
        return result;
      } catch( ex: unknown) {
        console.log("UsersDao sqlite:", (ex as Error).message);
        throw ex;
      }
    }

    public async deleteUsers( deleteUser:Partial<IUsers>) {
      try{
        const {_id } = deleteUser;
        const result = await super.delete({_id});
        return result;
      }catch( ex: unknown) {
        console.log("UsersDao sqlite:", (ex as Error).message);
        throw ex;
      }
    }
}
