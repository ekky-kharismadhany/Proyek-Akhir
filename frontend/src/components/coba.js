const axios = require('axios')

function test() {

    axios.get('http://127.0.0.1:5000/classification')
        .then(function (response) {
            // handle success
            // console.log(response.data);
            result = response.data.result
            metric = response.data.metric
            // console.log(typeof(result))
            let data = Object.values(result)
            console.log(data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return error;
        })
        .then(function () {
            // always executed
        });

}

test()