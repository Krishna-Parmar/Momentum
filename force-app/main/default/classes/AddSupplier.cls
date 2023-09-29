public with sharing class AddSupplier {
    public static List<sObject> supplierList = new List<sObject>();

    @AuraEnabled
    public static void addNewSupplier(String SName, String SEmail, Integer SCompanyRegistrationNumber, String SHoldingCompanyGroupName, String SRegisterdBusinessName, String S_SelectTheSupplierType) {
        Supplier__c S = new Supplier__c();
        S.Name = SName;
        S.Supplier_Email__c = SEmail;
        S.Company_Registration_Number__c = SCompanyRegistrationNumber;
        S.Holding_Company_Group_Name__c = SHoldingCompanyGroupName;
        S.Registered_Business_Name__c = SRegisterdBusinessName;
        S.Select__c = S_SelectTheSupplierType; 
        
       // supplierList.add(S);
    }

    @AuraEnabled
    public static void addVATDetails(String VIsReg, Integer VRegNum, Integer VSupplierID) {
        Supplier__c V = new Supplier__c();
        V.Registered_for_VAT__c = VIsReg;
        V.VAT_Registration_Number__c = VRegNum;
        V.Supplier_ID_Number__c = VSupplierID;
        
      //  supplierList.add(V);
    }

    @AuraEnabled
    public static void addReqOverview(String ReqReqType, String ReqCommodityType, String ReqCostCentre, Decimal ReqEstimateAmount,
                                      String SName, String SEmail, Integer SCompanyRegistrationNumber, String SHoldingCompanyGroupName, String SRegisterdBusinessName, String S_SelectTheSupplierType,
                                      String VIsReg, Integer VRegNum, Integer VSupplierID) {
        Supplier__c Req = new Supplier__c();
        Req.Request_Type__c = ReqReqType;
        Req.Commodity_Type__c = ReqCommodityType;
        Req.Cost_Center__c = ReqCostCentre;
        Req.Estimated_Contract_Amount_ZAR__c = ReqEstimateAmount;

        //suplier
        Req.Name = SName;
        Req.Supplier_Email__c = SEmail;
        Req.Company_Registration_Number__c = SCompanyRegistrationNumber;
        Req.Holding_Company_Group_Name__c = SHoldingCompanyGroupName;
        Req.Registered_Business_Name__c = SRegisterdBusinessName;
        Req.Select__c = S_SelectTheSupplierType; 

        //VAT
        Req.Registered_for_VAT__c = VIsReg;
        Req.VAT_Registration_Number__c = VRegNum;
        Req.Supplier_ID_Number__c = VSupplierID;

        supplierList.add(Req);
        insertSupplierList();
    }

    @AuraEnabled
    public static Supplier__c insertAllSupplierDetails(String ReqReqType, String ReqCommodityType, String ReqCostCentre, Decimal ReqEstimateAmount,
                                      String SName, String SEmail, Integer SCompanyRegistrationNumber, String SHoldingCompanyGroupName, String SRegisterdBusinessName, String S_SelectTheSupplierType,
                                      String VIsReg, Integer VRegNum, Integer VSupplierID, String draftStatus) {
                                        System.debug('Harish');
        Supplier__c Req = new Supplier__c();
        Req.Request_Type__c = ReqReqType;
        Req.Commodity_Type__c = ReqCommodityType;
        Req.Cost_Center__c = ReqCostCentre;
        Req.Estimated_Contract_Amount_ZAR__c = ReqEstimateAmount;

        //suplier
        Req.Name = SName;
        Req.Supplier_Email__c = SEmail;
        Req.Company_Registration_Number__c = SCompanyRegistrationNumber;
        Req.Holding_Company_Group_Name__c = SHoldingCompanyGroupName;
        Req.Registered_Business_Name__c = SRegisterdBusinessName;
        Req.Select__c = S_SelectTheSupplierType; 

        //VAT
        Req.Registered_for_VAT__c = VIsReg;
        Req.VAT_Registration_Number__c = VRegNum;
        Req.Supplier_ID_Number__c = VSupplierID;

        Req.Status__c='Pending Approval';
        Req.Draft_Status__c=draftStatus;
        

        supplierList.add(Req);
        insertSupplierList();
        return Req;
    }


    @AuraEnabled
    public static void insertSupplierList() {
        insert supplierList;
    }

    @AuraEnabled
    public static void updateSupplierDraftStatus(Id recordId,String ReqReqType, String ReqCommodityType, String ReqCostCentre, Decimal ReqEstimateAmount,
                                                    String SName, String SEmail, Integer SCompanyRegistrationNumber, String SHoldingCompanyGroupName, String SRegisterdBusinessName, String S_SelectTheSupplierType,
                                                    String VIsReg, Integer VRegNum, Integer VSupplierID, String draftStatus) {
        Supplier__c s=new Supplier__c();
        s.Id=recordId;
        s.Request_Type__c = ReqReqType;
        s.Commodity_Type__c = ReqCommodityType;
        s.Cost_Center__c = ReqCostCentre;
        s.Estimated_Contract_Amount_ZAR__c = ReqEstimateAmount;

        //suplier
        s.Name = SName;
        s.Supplier_Email__c = SEmail;
        s.Company_Registration_Number__c = SCompanyRegistrationNumber;
        s.Holding_Company_Group_Name__c = SHoldingCompanyGroupName;
        s.Registered_Business_Name__c = SRegisterdBusinessName;
        s.Select__c = S_SelectTheSupplierType; 

        //VAT
        s.Registered_for_VAT__c = VIsReg;
        s.VAT_Registration_Number__c = VRegNum;
        s.Supplier_ID_Number__c = VSupplierID;

        s.Status__c='Pending Approval';
        s.Draft_Status__c=draftStatus;
        update s;
    }
}


