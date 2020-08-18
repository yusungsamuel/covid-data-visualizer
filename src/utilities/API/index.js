import axios from "axios";

const covidData = {
    singleState: (state) =>{
        let url = `https://api.covidtracking.com/api/v1/states/${state}/daily.json`
        return axios({
            "method": "GET",
            "url": url
        })

    },
    allStateCurrent: ()=>{
        let url = "https://api.covidtracking.com/api/v1/states/current.json"
        return axios({
            "method": "GET",
            "url": url
        })
    }
};

export default covidData;
