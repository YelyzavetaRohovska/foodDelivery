const UserModel = require('../models/User')

class UserService {
    find = async (options) => {
        try {
            const users = await UserModel.find(options);
            if (users.length) {
                return {users, status: 'found'}
            }
            return {users, status: 'not found'}
        } catch (e) {
            return {users: [], status: 'internal error'}
        }
    }
    create = async (data) => {
        try {
            const {phone, countryCode} = data;
            const {users, status} = await this.find({phone, countryCode})
            if (status === 'found') {
                return {users, status: 'already exist'}
            }
            const newUser = new UserModel(data);
            await newUser.save();
            return {users: [newUser], status: 'created'};
        } catch (e) {
            return {users: [], status: 'internal error'}
        }
    }
    findAndUpdate = async (filter, update) => {
        try {
            const user = await UserModel.findOneAndUpdate(filter, update);
            return {users: [user], status: 'updated'}
        } catch (e) {
            return {users: [], status: 'internal error'}
        }
    }
}

module.exports = new UserService();