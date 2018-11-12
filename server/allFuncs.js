insertInDb = (req)=>{
    
    let ProbabilityTest=req.body[0].probabilitytest
    let ConcequenceTest=req.body[0].concequencetest
    let MitigationTest=req.body[0].mitigationtest
    let ReasonTest=req.body[0].reasonstest
    let ProbabilityBudget=req.body[1].probabilitybudget
    let ConcequenceBudget=req.body[1].concequencebudget
    let MitigationBudget=req.body[1].mitigationbudget
    let ReasonBudget=req.body[1].reasonsbudget
    let ProbabilityDeliveryD=req.body[2].probabilitydelay
    let ConcequenceDeliveryD=req.body[2].concequencedelay
    let MitigationDeliveryD=req.body[2].mitigationdelay
    let ReasonDeliveryD=req.body[2].reasonsdelay
    let ProbabilityCustomer=req.body[3].probabilitycustomer
    let ConcequenceCustomer=req.body[3].concequencecustomer
    let MitigationCustomer=req.body[3].mitigationcustomer
    let ReasonCustomer=req.body[3].reasonscustomer
    
    
    let project = req.body[0].projectName

    let totalRisk =((ProbabilityTest*ConcequenceTest)+(ProbabilityBudget*ConcequenceBudget)+(ProbabilityDeliveryD*ConcequenceDeliveryD)+(ProbabilityCustomer*ConcequenceCustomer))/4

    let sql = `INSERT INTO ${project} (total,ProbabilityTest,ConcequenceTest,MitigationTest,ReasonTest,ProbabilityBudget,ConcequenceBudget,MitigationBudget,ReasonBudget,ProbabilityDeliveryD,ConcequenceDeliveryD,MitigationDeliveryD,ReasonDeliveryD,ProbabilityCustomer,ConcequenceCustomer,MitigationCustomer,ReasonCustomer) VALUES 
    
  ('${totalRisk}','${ProbabilityTest}', '${ConcequenceTest}', '${MitigationTest}', '${ReasonTest}',
  '${ProbabilityBudget}', '${ConcequenceBudget}', '${MitigationBudget}', '${ReasonBudget}',
  '${ProbabilityDeliveryD}', '${ConcequenceDeliveryD}', '${MitigationDeliveryD}', '${ReasonDeliveryD}',
  '${ProbabilityCustomer}', '${ConcequenceCustomer}', '${MitigationCustomer}', '${ReasonCustomer}')`


return sql

}

module.exports.insertInDb =insertInDb 