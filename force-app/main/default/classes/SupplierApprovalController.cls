public with sharing class SupplierApprovalController {

    @AuraEnabled
    public static void approveRecord(Id recordId, String msg) {
        try {
            // Fetch the record to be approved
            Supplier__c supplierRecord = [SELECT Id, Status__c FROM Supplier__c WHERE Id =: recordId];

            // Check if the record is in a state that can be approved (e.g., pending approval)
            if (supplierRecord.Status__c == 'Pending Approval') {
                // Update the record status to approved
                approveRecordServer(recordId, msg);
                //supplierRecord.Status__c = 'Approved';
                //update supplierRecord;
            } else {
                throw new AuraHandledException('Record cannot be approved in the current state.');
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void rejectRecord(Id recordId, String msg) {
        try {
            // Fetch the record to be rejected
            Supplier__c supplierRecord = [SELECT Id, Status__c FROM Supplier__c WHERE Id =: recordId];

            // Check if the record is in a state that can be rejected (e.g., pending approval)
            if (supplierRecord.Status__c == 'Pending Approval') {
                // Update the record status to rejected
                rejectRecordServer(recordId, msg);

                // supplierRecord.Status__c = 'Rejected';
                //update supplierRecord;
            } else {
                throw new AuraHandledException('Record cannot be rejected in the current state.');
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void requestCorrection(Id recordId, String msg) {
        try {
            // Fetch the record to be rejected
            Supplier__c supplierRecord = [SELECT Id, Status__c FROM Supplier__c WHERE Id =: recordId];

            // Check if the record is in a state that can be rejected (e.g., pending approval)
            if (supplierRecord.Status__c == 'Pending Approval') {
                // Update the record status to rejected
                requestCorrectionServer(recordId, msg);

                // supplierRecord.Status__c = 'Rejected';
                //update supplierRecord;
            } else {
                throw new AuraHandledException('Record cannot be recalled in the current state');
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    public static boolean approveRecordServer(Id processInstanceId, String msg) {
        Approval.ProcessWorkitemRequest req = new Approval.ProcessWorkitemRequest();
        req.setComments('Approved:' + msg);
        req.setAction('Approve');
        req.setNextApproverIds(new List < Id > ());

        Id workItemId = getWorkItemId(processInstanceId);
        req.setWorkitemId(workItemId);
        Approval.ProcessResult result = Approval.process(req);


        if (result.isSuccess()) {
            System.debug('Record approved: ' + processInstanceId);
            return true;
        } else {
            System.debug('Failed to approve record: ' + result.getErrors()[0].getMessage());
        }

        return false;
    }

    public static boolean rejectRecordServer(Id processInstanceId, String msg) {
        Approval.ProcessWorkitemRequest req = new Approval.ProcessWorkitemRequest();
        req.setComments('Rejected:' + msg);
        req.setAction('Reject');
        req.setNextApproverIds(new List < Id > ());
        Id workItemId = getWorkItemId(processInstanceId);
        req.setWorkitemId(workItemId);
        Approval.ProcessResult result = Approval.process(req);

        if (result.isSuccess()) {
            System.debug('Record rejected: ' + processInstanceId);
            return true;
        } else {
            System.debug('Failed to reject record: ' + result.getErrors()[0].getMessage());
        }
        return false;
    }

    public static boolean requestCorrectionServer(Id processInstanceId, String msg) {
        Approval.ProcessWorkitemRequest req = new Approval.ProcessWorkitemRequest();
        req.setComments('Request Correction:' + msg);
        req.setAction('Removed');
        req.setNextApproverIds(new List < Id > ());
        Id workItemId = getWorkItemId(processInstanceId);
        req.setWorkitemId(workItemId);
        Approval.ProcessResult result = Approval.process(req);

        if (result.isSuccess()) {
            System.debug('Record recall: ' + processInstanceId);
            return true;
        } else {
            System.debug('Error recalling approval: ' + result.getErrors()[0].getMessage());
        }
        return false;
    }

    public static Id getWorkItemId(Id targetObjectId) {
        Id retVal = null;

        for (ProcessInstanceWorkitem workItem: [Select p.Id from ProcessInstanceWorkitem p where p.ProcessInstance.TargetObjectId =: targetObjectId]) {
            retVal = workItem.Id;
        }

        return retVal;
    }

    @AuraEnabled(cacheable = true)
    public static List < Supplier__c > getPendingApprovalSuppliers() {
        List < Supplier__c > pendingApprovalSuppliers = [SELECT Id, Name, Status__c, Createddate
            FROM Supplier__c
            WHERE Status__c = 'Pending Approval'
            AND Draft_Status__c = 'Complete'
            ORDER BY Createddate DESC LIMIT 1
        ];
        return pendingApprovalSuppliers;
    }

}