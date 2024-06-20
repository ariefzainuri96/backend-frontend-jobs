import mongoose from 'mongoose';

export type JobItem = {
    id?: string;
    title?: string;
    type?: string;
    description?: string;
    location?: string;
    salary?: string;
    company?: Company;
};

export type Company = {
    name?: string;
    description?: string;
    contactEmail?: string;
    contactPhone?: string;
};

const CompanySchema = new mongoose.Schema<Company>(
    {
        name: {
            type: String,
            required: [true, 'Please enter company name!'],
        },
        description: {
            type: String,
            required: [true, 'Please enter company description!'],
        },
        contactEmail: {
            type: String,
            required: [true, 'Please enter company contact email!'],
        },
        contactPhone: {
            type: String,
            required: [true, 'Please enter company contact phone!'],
        },
    },
    {
        timestamps: true,
    }
);

const JobSchema = new mongoose.Schema<JobItem>(
    {
        title: {
            type: String,
            required: [true, 'Please enter job title!'],
        },
        type: {
            type: String,
            required: [true, 'Please enter job type!'],
        },
        description: {
            type: String,
            required: [true, 'Please enter job description!'],
        },
        location: {
            type: String,
            required: [true, 'Please enter job location!'],
        },
        salary: {
            type: String,
            required: [true, 'Please enter job salary!'],
        },
        company: {
            type: CompanySchema,
            required: [true, 'Please enter job company!'],
        },
    },
    {
        timestamps: true,
    }
);

const reactDB = mongoose.connection.useDb('react');
const vueDB = mongoose.connection.useDb('vue');
const angularDB = mongoose.connection.useDb('angular');

const ReactJob = reactDB.model('Job', JobSchema);
const VueJob = vueDB.model('Job', JobSchema);
const AngularJob = angularDB.model('Job', JobSchema);

export { ReactJob, VueJob, AngularJob };
