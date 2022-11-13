public without sharing class createTemporaryUser {
   @AuraEnabled
   public static void insertTemporaryUser(TemporaryUser__c temUserObject){
    try {
        System.debug(temUserObject);
        insert temUserObject;
        // return temUserObject;

    } catch (Exception e) {
        System.debug(e.getStackTraceString());
        throw new AuraHandledException(e.getMessage());
    }
   }
   //Create crypto password to store data
   @AuraEnabled
    public static String encryptDataAES128(String stringInitializationVector, String stringData){
    try {
         Blob initializationVector = Blob.valueOf(stringInitializationVector);
         Blob key = Crypto.generateAesKey(128);
         Blob dataEncrypto = Blob.valueOf(stringData);
         Blob encrypted = Crypto.encrypt('AES128', key, initializationVector, dataEncrypto);
         return EncodingUtil.base64Encode(encrypted);
        } catch (Exception e) {
             throw new AuraHandledException(e.getMessage());
            }
    }
   //Create hash to send email
    @AuraEnabled
    public static String hashDataSHA512(String stringData){
        try {
            Blob targetBlob = Blob.valueOf(stringData);
            Blob hash = Crypto.generateDigest('SHA-512', targetBlob);
            String hashString = EncodingUtil.base64Encode(hash);
            System.debug(hashString);
            return hashString;
            } catch (Exception e) {
             throw new AuraHandledException(e.getMessage());
            }
    }
   
   @AuraEnabled
   public static String sendEmail(String address, String linkData){
    try {
        // First, Reserve email capacity for the current Apex transaction to ensure
        // that we won't exceed our daily email limits when sending email after
        // the current transaction is committed.
        System.debug('Come to SendEmail!');
        //Messaging.reserveSingleEmailCapacity(1);
        // Now create a new single email message object
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {address};
        // Assign the addresses to the mail object.
        mail.setToAddresses(toAddresses);
        // Specify the name used as the display name.
        mail.setSenderDisplayName('Salesforce Support');
        // Specify the subject line for your email address.
        mail.setSubject('「SOKA ID登録完了通知メール」');
        // Specify the text content of the email.
        mail.setPlainTextBody(linkData);
        // Send the email you have created.
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        return 'Send email successfully!' + address;
    } catch (Exception e) {
        System.debug('Cannot send the email!');
        throw new AuraHandledException(e.getMessage());
    }
   }
}
