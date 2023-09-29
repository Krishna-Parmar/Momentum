public with sharing class ListOfPendingRequestController {
 
  
    @AuraEnabled(cacheable=true)
    public static List<Supplier__c> getPendingApprovalRequest() {
        List<Supplier__c> pendingApprovalRequest = [SELECT Id, Name, Status__c,Supplier_ID_Number__c,Supplier_Email__c,Createddate,Requested_Date__c
                                                      FROM Supplier__c
                                                      WHERE Status__c = 'Pending Approval' AND Draft_Status__c='Complete' ORDER BY Createddate DESC];
        return pendingApprovalRequest;
    }
}