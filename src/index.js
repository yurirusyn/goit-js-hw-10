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
    if (!value) {
        addMarkup() 
       return
    }
    api.fetchCountries().then( respons => {
        console.log(e.target.value);
         if (respons.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            addMarkup() 
            return
        }
        else if (respons.length >= 2 && respons.length <= 10 ){
           countryMarkup(respons); 
            
           addMarkup(countryMarkup(respons), ' ')
          } 
              else if (respons.length === 1){
                addMarkup(' ',countrysMarkup(respons))
              }
      
    } ).catch( (eror) => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    }
    );
}

function addMarkup (a = '', b = '') {
    refs.countryList.innerHTML = a;
    refs.countryInfo.innerHTML = b;
};

function countryMarkup (countrys) {
const markup = countrys.map(country => {
 return `<li><p><img src="${country.flags.svg}" alt="${country.name.official}" width="30" >${country.name.official}</p></li>`
}).join('');
return markup
}

function countrysMarkup (countrys) {
    const markup = countrys.map(country => {
     return `<p><img src="${country.flags.svg}" alt="${country.name.official}" width="30" >${country.name.official}</p>
     <p>Capital: ${country.capital}</p>
     <p>Population: ${country.population}</p>
     <p>Languages: ${Object.values(country.languages)}</p>`
    }).join('');
    return markup
    }

