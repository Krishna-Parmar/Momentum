public with sharing class vendorscreen {
   
        @AuraEnabled(cacheable = true)
        public static list<Supplier__c> getsupplierDetails(string searchkey){
            system.debug('this is in vender screen');
            string mykeyword = searchkey + '%';
            return [SELECT Id, Name, Supplier_Email__c, Company_Registration_Number__c, Holding_Company_Group_Name__c, Registered_Business_Name__c,Draft_Status__c FROM Supplier__c where Name like :mykeyword ];
        }
}