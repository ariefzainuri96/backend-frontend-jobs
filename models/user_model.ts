import mongoose from 'mongoose';

export type TUserType = {
    email?: string;
    password?: string;
};

const UserSchema = new mongoose.Schema<TUserType>(
    {
        email: {
            type: String,
            required: [true, 'Please enter the email!'],
            unique: [true, 'Email address already taken'],
        },
        password: {
            type: String,
            required: [true, 'Please enter the password!'],
        },
    },
    {
        timestamps: true,
    }
);

const userDB = mongoose.connection.useDb('user');

const User = userDB.model('User', UserSchema);

export default User;
