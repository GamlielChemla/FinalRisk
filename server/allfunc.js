const validValues =(myArray,sqlKeys )=>{
    let newArr =[]
    
   


    myArray.forEach( (elem, index)=>{
      let myKey = sqlKeys[index] 

          // console.log( "zazazazzazaza" ,elem[myKey]);
          
       if(elem[myKey].length > 0 || elem >-1){
         newArr.push(elem)
         
       }
      
     })
     return newArr
     
   }

   let z=  validValues(arr,sqlKeys )
