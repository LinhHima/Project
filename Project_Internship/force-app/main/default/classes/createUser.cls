public without sharing class createUser {
    @AuraEnabled
    public static TemporaryUser__c getTemporaryUser(String hashData){
        try {
            System.debug('hashData: '+hashData);
           System.debug('Call getTemUser');
           List<TemporaryUser__c> temporaryUser = [SELECT Email__c, AutoNumberCommonUserId__c, Password__c, InitializationVector__c, NameInputType__c,
           FirstName__c, LastName__c, LastNameKana__c, FirstNameKana__c, BirthDay__c, CountryCode1__c, Phone1__c,
           CountryCode2__c, Phone2__c, HashingTemporaryUserId__c
            FROM TemporaryUser__c WHERE HashingTemporaryUserId__c = :hashData LIMIT 1];
            System.debug(temporaryUser);
            if(temporaryUser.size()>0){
                System.debug('Exist Tempuser');
                return temporaryUser[0];
            } else{
                System.debug('Dont exist Tempuser!');
                return null;
            } 
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static boolean checkUserEmail(String email){
        try {
            System.debug('Check User exist?');
            List<User> listUser = [SELECT Id FROM User WHERE Username = :email LIMIT 1] ;
            if(listUser.size() > 0) return true;
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    // @AuraEnabled
    // public static void insertUser(User userSF){
    //  try {
    //     System.debug('Insert User !');
    //      System.debug(userSF);
    //      insert userSF;
    //      // return temUserObject;
 
    //  } catch (Exception e) {
    //      System.debug(e.getStackTraceString());
    //      throw new AuraHandledException(e.getMessage());
    //  }
    // }

    //Insert User
    @AuraEnabled
    public static String createSiteUser(User userSF, String passwordUser){
        List<User> userAdmin = [SELECT Id, Username, LastName, FirstName, Name, Email, Profile.Name FROM User WHERE Profile.Name = 'System Administrator'];
             Account act = new Account(
                     Name = userSF.FirstName + userSF.LastName,
                     OwnerId = userAdmin[0].Id
            );
            Database.insert(act);
            
        	Profile p=[Select Id from Profile where Name='Customer Community Plus User' LIMIT 1];
        	User u = new User(
                    ProfileID = p.id,
                    Username = userSF.Username,
                    CommonUserId__c = userSF.CommonUserId__c,
                    Email = userSF.Email,
                    LastName = userSF.LastName,
                    FirstName = userSF.FirstName,
                    Alias = userSF.Alias,
                    CommunityNickname = userSF.CommunityNickname,
                    NameInputType__c = userSF.NameInputType__c,
                    LastNameKana__c	= userSF.LastNameKana__c,
                    FirstNameKana__c = userSF.FirstNameKana__c,
                    BirthDay__c = userSF.BirthDay__c,
                    CountryCode1__c = userSF.CountryCode1__c,
                    Phone1__c = userSF.Phone1__c,
                    CountryCode2__c = userSF.CountryCode2__c,
                    Phone2__c = userSF.Phone2__c
                    );
        	String userId='';
       		try {
            	userId = Site.createExternalUser(u, act.Id, passwordUser);
                System.Debug(userId);
            } catch(Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        return userId;
            
    }
}
