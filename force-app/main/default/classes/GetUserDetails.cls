public with sharing class GetUserDetails {

    @AuraEnabled(cacheable=true)
   
   public static User getDetails(){

string userId= UserInfo.getUserId();

    return [SELECT Id, Username, LastName, FirstName, Name FROM User where Id=:userId  LIMIT 1 ];

   }
}