import {Router} from 'express';
import {Request, Response} from 'express';
import { MPCaseController } from './controller';

export class MPCaseRoutes{

    static get routes(): Router{
        const router = Router();
        const mpCaseController = new MPCaseController();
        router.get("/", mpCaseController.getMPCases);
        router.post("/", mpCaseController.createMPCase);
        router.get("/lastweek", mpCaseController.getLastWeekMPCases);
        router.put("/:id", mpCaseController.updateMPCase);
        router.delete("/:id", mpCaseController.deleteMPCase);
        return router;
    }
}