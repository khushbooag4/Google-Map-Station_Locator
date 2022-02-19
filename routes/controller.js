var controller = module.exports;
var Station = require('../models/stations');

controller.addStations = async(req,res) => {
         try {
             const { operatorName , status , address , phoneNumber , state} = req.body;
             const userExist = Station.find({
               phoneNumber : phoneNumber
             });
             if (userExist.phoneNumber !== undefined) {
               return res.status(400);
             }else{
                const user = new Station({
                  operatorName: operatorName,
                  state: state,
                  address: address,
                  phoneNumber: phoneNumber,
                  status: status,
                });
                const response = await user.save();
                if (response) {
                  return res.status(201).json({
                    success: true,
                    data: user,
                  });
                }           
             }          
         } catch (error) {
             console.error(error);
             if (error.code === 11000) {
               return res
                 .status(400)
                 .json({ error: "This Station already exists" });
             }
             res.status(500).json({ error: "Server error" });
         }
}