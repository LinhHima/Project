public without sharing class DSPF_UserDAO {
    @AuraEnabled(cacheable=true)
    public static boolean getUserByEmail(String email){
        try {
            List<User> listUser = [SELECT Id FROM User WHERE Username = :email LIMIT 1] ;
            if(listUser.size() > 0) return true;
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
