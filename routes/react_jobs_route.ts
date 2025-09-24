import express from 'express';
import {
    addJob,
    deleteJobById,
    getJobById,
    getJobs,
    updateJobById,
} from '../controllers/jobs_controller';
import { JobItem, ReactJob } from '../models/job_model';
import { validateToken } from '../middleware/validate_token';

const router = express.Router();

// validate token for all request in this routes
router.use(validateToken);

// add job
router.post('/', async (req, res) => {
    /*
    #swagger.summary = 'Post Job';
    #swagger.description = 'Post job related to react framework';
    #swagger.parameters['body'] = {
        required: true,     
        in: 'body',   
        schema: { $ref: '#/components/schemas/ReactJobRequest' },
    };
    */
    return await addJob<JobItem>(ReactJob, req, res);
});

// get all jobs
router.get('/', async (req, res) => await getJobs<JobItem>(ReactJob, req, res));

// get job by id
router.get(
    '/:id',
    async (req, res) => await getJobById<JobItem>(ReactJob, req, res)
);

// update job by id
router.put(
    '/:id',
    async (req, res) => await updateJobById<JobItem>(ReactJob, req, res)
);

// delete job by id
router.delete(
    '/:id',
    async (req, res) => await deleteJobById<JobItem>(ReactJob, req, res)
);

export default router;
