import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please enter the email!'],
            unique: [true, 'Email address already taken']
        },
        password: {
            type: String,
            required: [true, 'Please enter the password!'],
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema)

export default User