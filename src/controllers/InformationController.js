global.db = require('../config/db');

module.exports = {

    async getInformation(request, response) {

        global.db.findInformation((e, docs) => {
            if (e) { return console.log(e); }
            console.log("Chegou aqui");

            // response.json({
            //     message: err.message,
            //     error: err
            //   });


            return response.json({ information: docs });
        })

    },


    async getInformationWithID(request, response) {
        try {
            const { id } = request.params;
            global.db.findOne(id, (error, docs) => {
                if (error) {
                    console.log("Esse erro " + error);
                    return response.status(500).send(error);
                }

                if(docs.length == 0){
                    return response.status(404).send({"Error" : "Informação não encontrada"});
                }

                return response.send({ information: docs[0] });
            })
        } catch (error) {
            console.log(error);
            return response.status(500).send({"Erro": error.message});
        }


    }




}