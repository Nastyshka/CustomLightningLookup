public with sharing class CustomLookUpController {
    @AuraEnabled
    public static List < SObject > fetchLookUpValues(String searchKeyWord, String ObjectName) {
        System.debug(' >>> ObjectName > ' + ObjectName);
        String searchKey = searchKeyWord + '%';

        List < SObject > returnList = new List < SObject > ();

        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 5
        String sQuery = 'select Id, Name from ' + ObjectName + ' where Name LIKE: searchKey order by createdDate DESC LIMIT 5';
        List < SObject > lstOfRecords = Database.query(sQuery);

        for (SObject obj : lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
    }
}