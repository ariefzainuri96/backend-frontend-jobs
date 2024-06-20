import express from 'express';
import {
    addJob,
    deleteJobById,
    getJobById,
    getJobs,
    updateJobById,
} from '../controllers/jobs_controller';
import { JobItem, VueJob } from '../models/job_model';

const router = express.Router();

// validate token for all request in this routes
// router.use(validateToken);

// add job
router.post('/', async (req, res) => await addJob<JobItem>(VueJob, req, res));

// get all jobs
router.get('/', async (req, res) => await getJobs<JobItem>(VueJob, req, res));

// get job by id
router.get(
    '/:id',
    async (req, res) => await getJobById<JobItem>(VueJob, req, res)
);

// update job by id
router.put(
    '/:id',
    async (req, res) => await updateJobById<JobItem>(VueJob, req, res)
);

// delete job by id
router.delete(
    '/:id',
    async (req, res) => await deleteJobById<JobItem>(VueJob, req, res)
);

export default router;
