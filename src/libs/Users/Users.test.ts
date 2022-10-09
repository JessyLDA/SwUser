import {IUsers, Users} from './index';

describe('Users Lib Unit Test', ()=>{
    it( 'should Create an Instance of Users', ()=>{
        const UsersInstance = new Users();
        expect(UsersInstance).toBeDefined();
    });
    it(' should Add a new Users Item', ()=>{
        const UsersInstance = new Users();
        const UsersItem : IUsers = {
            name: 'Jessy',
            apellido: 'Díaz',
            email: 'correo@gmail.com',
            password: '12345678'
        };
        const index = UsersInstance.addUser(UsersItem);
        expect(index).toBe(0);
    });
});