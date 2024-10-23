import { Request, Response, NextFunction } from 'express';
import { wrapRequestHandler, success, error } from '../../../../../helpers/response'
import { createRouter } from '../../../../../routes/apiRouter'
import db from '../../../../../models';
const handler = async (req: Request, res: Response): Promise<any> => {
    const data = await db.User.create({ name: 'rohit', email: 'rohit@gmail.com' })
    const response = success("Hurry", { data })
    return res.json(response)
}

createRouter.post('/user', wrapRequestHandler(handler))