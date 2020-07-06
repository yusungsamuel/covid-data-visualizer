import axios from "axios";

const covidData = {
    getAllCountries: ()=>{
        let url = "https://api.covid19api.com/countries"
        return axios({
            "method": "GET",
            "url": url
        })
    },
    dayOne: (country) =>{
        let url = `https://api.covid19api.com/total/country/${country}/status/confirmed`
        return axios({
            "method": "GET",
            "url": url
        })

    }
};

export default covidData;
