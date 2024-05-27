
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function sendEmailToCustomer(){
    const customer = await getCustomer(23); 
    console.log('Customer', customer)
   
    if(customer.isGold){
    const movies = await getTopMovies();
    console.log('Top movies', movies);
    await sendEmail(customer.email, movies);
    console.log(`email sent to ${customer.email} with movies ${movies}`);
    }    
  }
  
  
  sendEmailToCustomer();
  
  
  function getCustomer(id) {
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve({ 
          id: id, 
          name: 'Mosh Hamedani', 
          isGold: true, 
          email: 'email' 
        });
      }, 4000);  
    })
  
  }
  
  function getTopMovies() {
   return  new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(['movie1', 'movie2']);
      }, 4000);
    })
   
  }
  
  function sendEmail(email, movies) {
   return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve('Sending email');
      }, 4000);
    })
    
  }