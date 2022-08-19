export default class UserValidator{

    constructor(
        ) {
  
         }

    validateUser = (user) => {
      let validation = '200';

      validation= this.searchForSpecialChars(user)===false? 'El usuario no puede contener carácteres especiales': '200';



    };

    searchForSpecialChars = (user) =>{
        let iChars = "!`@#$%^&*()+=-[]\\\';,./{}|\":<>?~_ ";  
        for (var i = 0; i < user.username.length; i++)
            
           {      
           
           if (iChars.indexOf(user.username.charAt(i)) != -1)
           
           {    
              
            return false
           } 
           }
  
           return true;
      }
}