import { Request, Response } from 'express';
import { IStandart } from '../interfaces/i_standart';
import { handleError, handleStatus } from '../utils/helper';
import { sendError } from '../common/common_functions';
import { Model } from 'mongoose';

export const addJob = async <T>(
    model: Model<T>,
    req: Request,
    res: Response
) => {
    try {
        const body = await model.validate(req.body);
        const job = await model.create(body);

        if (job) {
            res.status(200).json({
                status: 200,
                message: 'Successfully create job',
                data: job,
            } as IStandart);
        } else {
            return sendError(res, 400, 'Error creating job');
        }
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};

export const getJobs = async <T>(
    model: Model<T>,
    req: Request,
    res: Response
) => {
    try {
        const jobs = await model.find();
        res.status(200).json({
            status: 200,
            message: 'Successfully fetch jobs',
            data: jobs,
        } as IStandart);
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};

export const getJobById = async <T>(
    model: Model<T>,
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const job = await model.findById(id);

        if (!job) {
            return sendError(res, 404, 'Job not found');
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully fetch Job',
            data: job,
        } as IStandart);
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};

export const updateJobById = async <T>(
    model: Model<T>,
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        const job = await model.findByIdAndUpdate(id, req.body);

        if (!job) {
            return sendError(res, 404, 'Product not found!');
        }

        const updatedJob = await model.findById(id);

        res.status(200).json({
            status: 200,
            message: 'Successfully update Product',
            data: updatedJob,
        } as IStandart);
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};

export const deleteJobById = async <T>(
    model: Model<T>,
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const product = await model.findByIdAndDelete(id);

        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully delete Product',
            data: product,
        } as IStandart);
    } catch (error) {
        sendError(res, handleStatus(error), handleError(error));
    }
};
