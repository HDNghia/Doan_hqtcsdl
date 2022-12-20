import express from "express";
let router = express.Router();
import APIController from '../controller/APIController';

const initApiroute = (app) => {
    router.get('/staff', APIController.getAllStaff); //method GET => read data
    router.post('/create-staff', APIController.createNewStaff); //method POST => create data
    router.put('/update-staff', APIController.updateStaff); //method PUT => update data
    router.delete('/delete-staff', APIController.deleteStaff); //method DELETE => DELETE data
    router.get('/customer', APIController.getAllCustomer);
    router.post('/create-customer', APIController.createNewCustomer);
    router.put('/update-customer', APIController.updateCustomer);
    router.delete('/delete-customer', APIController.deleteCustomer);
    router.get('/match', APIController.getAllMatch);
    router.post('/create-match', APIController.createNewMactch);
    router.put('/update-match', APIController.updateMatch);
    router.delete('/delete-match', APIController.deleteMatch);
    router.get('/seat', APIController.getAllSeat);
    router.post('/create-seat', APIController.createNewSeat);
    router.delete('/delete-seat/:id', APIController.deleteSeat);
    router.put('/update-seat', APIController.updateSeat);
    router.get('/ticket', APIController.getAllTicket);
    router.post('/book-ticket', APIController.bookTicket);
    router.delete('/delete-ticket/:id', APIController.deleteTicket);
    router.put('/update-ticket', APIController.updateTicket);
    return app.use('/api/v1/', router)
}

export default initApiroute;
