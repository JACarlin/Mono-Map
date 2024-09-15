import {Router} from 'express';
import { MPCaseRoutes } from './mpCases/routes';

export class AppRoutes {
    static get routes() : Router{
        const router = Router();
        router.use("/api/mpcases",MPCaseRoutes.routes)
        return router
    }
}