"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'Please enter the email!'],
        unique: [true, 'Email address already taken']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password!'],
    },
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
