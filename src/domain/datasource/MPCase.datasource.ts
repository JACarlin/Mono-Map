import { MPCaseModel } from "../../data/models/mpcase.model";
import { IMPCaseDocument } from "../entities/MPCase.entitie";

export class MPCaseDataSource {
    public updateMPCase = async (id: string, mpcase: Partial<IMPCaseDocument>) => {
        await MPCaseModel.findByIdAndUpdate(id, {
            lat: mpcase.lat,
            lng: mpcase.lng,
            isSent: mpcase.isSent,
            genre: mpcase.genre,
            age: mpcase.age,
            creationDate: mpcase.creationDate
        })
    }
}