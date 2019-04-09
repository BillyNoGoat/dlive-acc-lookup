const axios = require("axios");
var fs = require("fs");

let {numbers, basicWords, namesM, namesF} = require("./words");

const results = [];

//Change words to a wordlist from line 1 if not wishing to run against every single list
//Example:
//const words = numbers;
//Otherwise, add them to the below array using the .../Spread syntax.

let words = [
    ...basicWords,
    ...namesM,
    ...namesF,
    ...numbers
];

(async () => {
    //Display name must be 3-20 characters in length
    words = words.filter(w => w.length >= 3 && w.length <= 20);
   
    for (let w of words) {
        const res = await axios({
            method: 'post',
            url: 'https://graphigo.prd.dlive.tv',
            headers: {'content-type': 'application/json'},
            data: {
                "operationName": "ValidDisplayName",
                "variables": {
                    "displayName": w
                },
                "query": "query ValidDisplayName($displayName: String!) {\n  displayNameIsValid(displayName: $displayName)\n}\n"
            }
          });
          const nameResult = {
              name: w,
              available: res.data.data.displayNameIsValid
          }
          console.log(nameResult);
          results.push(nameResult);
    };
    
    const filterPass = results.filter(e => e.available);
    console.log(`Found ${filterPass.length} available usernames, saving to file output.txt ...`);
    fs.writeFileSync("output.txt", JSON.stringify(filterPass, null, 2), function(err, data) {
        if (err) console.log(err);
        console.log(`Successfully saved output to file.`);
      });
})();
