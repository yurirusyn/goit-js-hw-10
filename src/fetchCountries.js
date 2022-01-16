
// export default function fetchCountries(name) {
//     const BASE_URL = "https://restcountries.com/v3.1/name/";
//     return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`).then(
//       response => {
//         if (!response.ok) {
//             throw new Error(response.status);
//           }
//           return response.json()
//     }
//     ).catch( (eror) => {
//         console.log(eror);
//     }
//     );
//   }

const fields ="?fields=name,capital,population,flags,languages";


export default class API {
  constructor() {
    this.value = '';

  }
  fetchCountries() {
    const BASE_URL = "https://restcountries.com/v3.1/name/";
    return fetch(`${BASE_URL}${this.value}${fields}`).then(
      response => {
        if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json()
    }
    ).catch( (eror) => {
        console.log(eror);
    }
    );
  }
  set newValue(newValue) {
    this.value = newValue;
  }
  get newValue(){
    return this.value
  }


}

  
  
