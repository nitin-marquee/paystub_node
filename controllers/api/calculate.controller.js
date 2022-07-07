const calculateYTDHelper = require("../../_helpers/calculate.helper");
const calculatePrevYTDHelper = require("../../_helpers/calculatePrevYTD.helper");

module.exports= {
    calculate: async (req, res) =>{
        var payload = req.body.current;
        var pre_stub = req.body.pre_stub;
        var i_index = req.body.i_index;
        var total_hours= req.body.total_hours;
        var calculateYTD = await calculateYTDHelper.calculate(payload, pre_stub, i_index, total_hours);

        res.send({status:201, msg: "YTD current" , data: calculateYTD});
    },
    calculatePrev: async (req, res) =>{
        var payload = req.body.current;
        var var1 = req.body.prevYTD;
        var pre_stub = req.body.pre_stub;
        var i_index = req.body.i_index;
        var total_hours= req.body.total_hours;
        var calculatePrevYTD = await calculatePrevYTDHelper.calculatePreviousYtd(var1, payload, pre_stub, i_index, total_hours);

        res.send({status:201, msg: "YTD Previous" , data: calculatePrevYTD});
    }
};