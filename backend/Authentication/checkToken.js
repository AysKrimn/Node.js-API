import jwt from 'jsonwebtoken'

const checkToken = (request, response, next) => {

    const tokenHeader = request.headers['authorization']

    if (!tokenHeader) {

        return response.status(400).json({ data: "Token Belirtilmedi."})
    }

    const token = tokenHeader.split('Bearer ')[1]

    jwt.verify(token, process.env['JWT_SECRET'], function(error, decoded) {

        if (error) {

            return response.status(404).json({ data: "Geçersiz Token"})

        } else {

            // return response.status(200).json({ data: decoded})
            request.user = decoded
            next()
        }

    })

}


export { checkToken }