
export default class SolContract {
    
    constructor(jsonPath){
        if (jsonPath===undefined || !jsonPath){
            throw new Error("must supply a path to the json file that contains the contract ABI");
        }
        this.path = jsonPath;
    }

    loadContract = async() => {
      
    }

    getContract = async() => {
        //contract loaded?
    }
 
}

