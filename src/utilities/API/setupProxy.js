import  proxy from "http-proxy-middleware";

export default function(app) {
    app.use(
      proxy("/states/current.json", {
        target: "https://covidtracking.com/api/v1",
        changeOrigin: true
      })
    );

  };