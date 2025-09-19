import User from '../models/user_model';
import m2s from 'mongoose-to-swagger';

const userSwaggerSchema = m2s(User, {
    omitFields: ['_id', 'createdAt', 'updatedAt'],
});

export default userSwaggerSchema;
