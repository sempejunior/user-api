global.db = require('../config/dbUser');
const httpStatus = require('http-status-codes');


module.exports = {

    async getUser(request, response) {
        try {
            global.db.findUsers((e, docs) => {
                if (e) { return console.log(e); }
                if (docs.length == 0) {
                    return response.status(httpStatus.StatusCodes.NOT_FOUND).send({ "error": "Users not found." });
                }
                return response.json({ user: docs });
            })
        } catch (error) {
            console.log(error);
            return response.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({ "error": error.message });
        }

    },


    async getUserWithID(request, response) {
        const { id } = request.params;

        try {
            global.db.findOne(id, (error, docs) => {
                if (error) {
                    throw new Error(err);
                }
                if (docs.length == 0) {
                    return response.status(httpStatus.StatusCodes.NOT_FOUND).send({ "error": "User not found." });
                }
                return response.send({ information: docs[0] });
            })
        } catch (error) {
            console.log(error);
            return response.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({ "error": error.message });
        }
    },

    async insertUser(request, response) {
        try {
            global.db.insertUser(request.body, (error, docs) => {

                return response.send({ user: docs });
            })
        } catch (error) {
            console.log(error);
            return response.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({ "error": error.message });
        }
    },

    async updateUser(request, response) {
        const { id } = request.params;
        try {
            global.db.updateUser(id, request, (error, docs) => {
                if (error) {
                    throw new Error(err);
                }
                return response.send({ information: docs[0] });
            })
        } catch (error) {
            console.log(error);
            return response.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({ "error": error.message });
        }
    },

    async deleteUser(request, response) {
        const { id } = request.params;
        try {
            global.db.deleteUser(id, (error, docs) => {
                if (error) {
                    throw new Error(err);
                }
                return response.send({ user: docs });
            })
        } catch (error) {
            console.log(error);
            return response.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({ "error": error.message });
        }
    }


}