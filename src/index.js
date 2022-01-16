import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
input: document.querySelector("#search-box"),
countryList: document.querySelector(".country-list"),
countryInfo: document.querySelector(".country-info"),
}

const api = new API();


refs.input.addEventListener("input", debounce(inputValue, DEBOUNCE_DELAY))

function inputValue (e) {
    const value = e.target.value.trim();
    api.newValue = value;
    if (value === "") {
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = ""
    }
    api.fetchCountries().then( respons => {
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



