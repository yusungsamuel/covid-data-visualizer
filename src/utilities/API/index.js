import axios from "axios";

const covidData = {
    singleState: (state) =>{
        let url = `/states/${state}/daily.json`
        return axios({
            "method": "GET",
            "url": url
        })

    },
    allStateCurrent: ()=>{
        let url = "/states/current.json"
        return axios({
            "method": "GET",
            "url": url
        })
    }
};

export default covidData;
