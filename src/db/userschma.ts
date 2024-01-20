import mongoose from "mongoose";
const userSchma = new mongoose.Schema({
    useName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authenticatoion: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
})

export const UserModel = mongoose.model("users", userSchma);

// actions 
export const getUsers = () => UserModel.find(); // find all the users
export const GetUseremal = (email: string) => UserModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
export const getUserSesionToken = (sessionToken: string) => UserModel.findOne({
    'authenticatoion.sessionToken': sessionToken
});
export const getUserbyid = (id: string) => UserModel.findById(id);
export const findandUpdate = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const CreateUsers = async (values: Record<string, any>) => {
    try {
        const User = new UserModel(values);
        const SaveUser = await User.save();
        return SaveUser.toObject();

    } catch (error) {
        console.error(error);
        throw error;
    }
}