import {Request, Response} from 'express';
import { MPCaseModel } from '../../data/models/mpCase.model';

export class MPCaseController{
    public getMPCases = async (req: Request, res:Response)=>{
        try {
            const mpCases = await MPCaseModel.find();
            res.json(mpCases);
        } catch (error) {
    
        }
    }
    public createMPCase = async (req:Request, res:Response)=>{
        try {
            const {lat, lng, isSent, genre, age, creationDate} = req.body;
            const newMPCase = await MPCaseModel.create({
                lat, lng, isSent, genre, age, creationDate});
            return res.json(newMPCase);
        }
        catch (error) {
    
        }
    }
    public getLastWeekMPCases = async (req:Request, res:Response)=>{
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
            const mpCases = await MPCaseModel.find({
                creationDate: { $gte: sevenDaysAgo }
            });
    
            res.json(mpCases);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    public updateMPCase = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const {lat, lng, isSent, genre, age, creationDate} = req.body;
        try{
            const mpCase = await MPCaseModel.findByIdAndUpdate(id,{
                lat, lng, isSent, genre, age, creationDate
            });
            res.json(mpCase);
        }catch(error){
            console.error(error);
        }
    }
    public deleteMPCase = async (req:Request, res:Response)=>{
        const {id} = req.params;
        try{
            const mpCase = await MPCaseModel.findByIdAndDelete(id);
            res.json(mpCase);
        }catch(error){
            console.error(error);
        }
    }

}