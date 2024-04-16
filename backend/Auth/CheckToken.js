/*
    BU FONKSIYONUN GOREVU CLIENTI YETKİLENDİRMEK
*/ 

import jwt from "jsonwebtoken"

const checkToken = function(request, response, next) {

    const tokenHeader = request.headers['authorization']

    if (!tokenHeader) {

            return response.status(401).json({ data: "Token Belirtilmedi"})
    }

    const token = tokenHeader.split(' ')[1]

    // tokeni parçala ve içindeki useri request ile döndür
    jwt.verify(token, process.env['JWT_SECRET'], function(error, decodedUser) {


        if (error) {

            return response.status(403).json({ data: "Geçersiz Token"})

        } else {

            request.user = decodedUser
            // ednpointe yönlendir.
            next()
        }

    })

 
}



export { checkToken }