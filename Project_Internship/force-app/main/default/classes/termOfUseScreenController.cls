public without sharing class termOfUseScreenController {
    @AuraEnabled(cacheable=true)
    public static IndividualServiceMaster__c getIndividualServiceMasterBySystemId(String systemId){
        try {
            List<IndividualServiceMaster__c> recs = [SELECT Id, Domain__c FROM IndividualServiceMaster__c WHERE SystemId__c = :systemId LIMIT 1];
            if(recs.size() > 0) {
                return recs[0];
            }
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
