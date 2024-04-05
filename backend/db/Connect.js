import mongoose from "mongoose";

const connect_to_db = async () => {

        // error handling
        try {
            
        await mongoose.connect(process.env['DB_CONNECTION'])
        console.log("Veritabanına başarılı bir şekilde bağlantı sağlandı.")
        
        } catch (error) {
            
            console.log("veritabanına bağlanırken bir hata meydana geldi. Hata:", error)
        }

}



export default connect_to_db