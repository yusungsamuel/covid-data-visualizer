import axios from "axios";

const covidData = {
    getAllCountries: ()=>{
        let url = "https://api.covid19api.com/countries"
        return axios({
            "method": "GET",
            "url": url
        })
    },
    singleState: (state) =>{
        let url = `https://covidtracking.com/api/v1/states/${state}/daily.json`
        return axios({
            "method": "GET",
            "url": url
        })

    },
    allStateCurrent: ()=>{
        let url = "https://covidtracking.com/api/v1/states/current.json"
        return axios({
            "method": "GET",
            "url": url
        })
    }
};

export default covidData;
