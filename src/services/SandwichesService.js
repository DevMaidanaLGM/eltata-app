import  axios from "axios"

export default class SandwichesService{ //C

    constructor(url
        ) {
          this.url= 'https://localhost:7176/api/sandwiches/';
         }
    

    getSandwiches = async () =>{

      console.log("SandwichesService: Trayendo sandwiches...")
       return await axios.get(this.url).then(response=>{
          
        let sandwiches=response.data;
        console.log('devolviendo sandwiches:')
        console.log(sandwiches);
        
          return sandwiches;
        }).catch(error =>{
          console.log(error)

        })
    }
    getSandwich = async (id) =>{
      console.log(`SandwichService: Trayendo al sandwich ${id }}`)
      return await axios.get(this.url+id).then(response=>{
         
       let sandwich=response.data;
       console.log('devolviendo sandwich:')
       console.log(sandwich);
       
         return sandwich;
       }).catch(error =>{
         console.log(error)

       })
       
    }
    postSandwich = async(sandwich)=>{
        console.log(`SandwichService: Logenado al sandwich ${sandwich.Id_Sandwich} `) 
        return   await axios.post(this.url,sandwich).then(response=>{
          
          let sandwichResponse=response.data;
                return sandwichResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }
  
      putSandwich = async(sandwich)=>{
        console.log(`SandwichService: Modificando al sandwich ${sandwich.Id_Sandwich} `) 
        return   await axios.put(this.url,sandwich).then(response=>{
          
          let sandwichResponse=response.data;
                return sandwichResponse;
          }).catch(error =>{
            console.log(error)
   
          })
      }

}