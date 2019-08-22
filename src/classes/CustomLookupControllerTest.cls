@IsTest
public with sharing class CustomLookupControllerTest {

    @IsTest
    public static void testFetchLookUpValues (){
        Contact c =  new Contact(LastName = 'John Doe');
        insert c;

        List<Contact> res = CustomLookUpController.fetchLookUpValues('Test', 'Contact');
        System.assertEquals(1, res.size(), 'Expected one Contact record to be found');
    }
}