import { injectable } from 'inversify';
import { INext, IReq, IReqFunc, IRes } from '../interfaces/express';

export interface IUserController {

}

@injectable()
export class UserController implements IUserController {

    public userData: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        req.data = req.userStore;
        return next();
    }
}
