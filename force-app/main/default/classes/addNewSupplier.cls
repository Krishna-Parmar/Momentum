public with sharing class addNewSupplier {
    @AuraEnabled
    public static void addNewSupplier(String SName,String SEmail,Integer SCompanyRegistrationNumber, String SHoldingCompanyGroupName,string SRegisterdBusinessName ,string S_SelectTheSupplierType) {
        Supplier__c S =new Supplier__c();
        S.Name=SName;
        S.Supplier_Email__c=SEmail;
        S.Company_Registration_Number__c=SCompanyRegistrationNumber;
        S.Holding_Company_Group_Name__c=SHoldingCompanyGroupName;
        S.Registered_Business_Name__c=SRegisterdBusinessName;
        S.Select__c=S_SelectTheSupplierType;
        insert S;
    }
}