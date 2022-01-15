import './css/styles.css';
import fetchCountries from './fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
input: document.querySelector("#search-box"),
countryList: document.querySelector(".country-list"),
countryInfo: document.querySelector(".country-info"),
}


refs.input.addEventListener("input", debounce(inputValue, DEBOUNCE_DELAY))

function inputValue (e) {
    const value = e.target.value.trim();
    if (value === "") {
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = ""
    }
    fetchCountries(value).then( respons => {
        console.log(e.target.value);
         if (respons.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            refs.countryList.innerHTML = "";
            refs.countryInfo.innerHTML = ""
        }
        else if (respons.length >= 2 && respons.length <= 10 ){
           
            respons.map(country => {
                const list =  document.createElement("li");
                list.className = "listelement"
                list.innerHTML = `<p><img src="${country.flags.svg}" alt="${country.name.official}" width="30" >${country.name.official}</p>`
                refs.countryList.append(list)
                
                refs.countryInfo.innerHTML = "";
                return
            });
          } 
              else if (respons.length === 1){
                
                const marcup = respons.map(country => {
                // // list.className = "listelement"
                // // const para =  document.createElement("p");
                // para.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.official}" width="30" >${country.name.official}`

                // refs.countryList.innerHTML = "";
                // refs.countryInfo.innerHTML = ""
                // return refs.countryInfo.append(para)


                return `<p><img src="${country.flags.svg}" alt="${country.name.official}" width="30" >${country.name.official}</p>
                <p>Capital: ${country.capital}</p>
                <p>Population: ${country.population}</p>
                <p>Languages: ${Object.values(country.languages)}</p>`
                });
                refs.countryList.innerHTML = "";
                refs.countryInfo.innerHTML = "";
                refs.countryInfo.innerHTML = marcup;
              }
      
    } ).catch( (eror) => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    }
    );
}



