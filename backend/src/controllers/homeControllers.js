const drinkInformation = require('../models/drinkInformation');

class homeController {
    async home (req,res){
        try{
            const drinkInfo = await drinkInformation.find();
            const drinkcaphe = await drinkInformation.find({category:'cà phê'});
            const drinkDaXay = await drinkInformation.find({category:'đá xay'});
            const drinkTra = await drinkInformation.find({category:'Trà'});
            const drinkNuocEp = await drinkInformation.find({category:'nước ép'});
            const drinkNuocNgot = await drinkInformation.find({category:'nước ngọt'});
            return res.status(200).json({
                drinkInfo,
                drinkcaphe,
                drinkDaXay,
                drinkTra,
                drinkNuocEp,
                drinkNuocNgot
        })
    }
        catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Lỗi server' });

        }
    }
   
}
module.exports = new homeController();