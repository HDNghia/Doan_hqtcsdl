import express from "express";
let router = express.Router();
import APIController from '../controller/APIController';

const initApiroute = (app) => {
    router.get('/users', APIController.getAllStaff); //method GET => read data
    router.post('/create-user', APIController.createNewStaff); //method POST => create data
    router.put('/update-user', APIController.updateUser); //method PUT => update data
    router.delete('/delete-user/:id', APIController.deleteStaff); //method DELETE => DELETE data
    return app.use('/api/v1/', router)
}
export default initApiroute;
