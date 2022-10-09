import {Router} from 'express';
import { IUsers, Users } from '@libs/Users';
import { commonValidator, validateInput } from '@server/utils/validator';

const router = Router();
const UsersInstance = new Users();

router.get('/', async (_req, res)=>{
    try {
        res.json(await UsersInstance.getAllUsers());
    }catch (ex) {
        console.error(ex);
        res.status(503).json({error:ex});
    }
});

router.get('/byindex/:index', async (req, res)=>{
    try{
        const {index} = req.params as unknown as {index:number};
        res.json(await UsersInstance.getUsersByIndex(+index));
    }catch(error){
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al obtener Registro'});
    }
});

router.post('/testvalidator', async (req, res)=>{
    const { email } = req.body;
    const validateEmailSchema = commonValidator.email;
    validateEmailSchema.param="email";
    validateEmailSchema.required =true;
    validateEmailSchema.customValidate = (values)=> {return values.includes('unicah.edu');}
    const errors = validateInput({email}, [validateEmailSchema]);
    if(errors.length > 0){
      return res.status(400).json(errors);
    }
    return res.json({email});
  });

router.post('/new', async (req, res)=>{
    try{
    const newUsers = req.body as unknown as IUsers;
    const newUsersIndex = await UsersInstance.addUser(newUsers);
    res.json({newIndex: newUsersIndex});
    }catch (error) {
      res.status(500).json({error: (error as Error).message});
    }
   });
  //VALIDATE
   router.put('/update/:index', async (req, res)=>{
    try {
      const { index } = req.params;
      const UsersFromForm = req.body as IUsers;
      await UsersInstance.updateUsers(+index, UsersFromForm);
      res.status(200).json({"msg":"Registro Actualizado"});
    } catch(error) {
      res.status(500).json({error: (error as Error).message});
    }
  });
  
  router.delete('/delete/:index', (req, res)=>{
    try{
        const { index } = req.params;
        if(UsersInstance.deleteUsers(+index)) {
            res.status(200).json({"msg": "Registro Eliminado"});
        } else{
            res.status(500).json({'msg': 'Error al eliminar Registro'});
        }
    } catch (error){
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  });

export default router;