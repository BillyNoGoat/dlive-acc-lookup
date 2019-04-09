# dlive-acc-lookup
#### Install
Git clone the directory and run `npm i` inside the new directory.
After dependencies are installed, the app can be run with `node app.js`.

#### Adding wordlist
As I made this in like 1 hour this is a pretty manual process.
- Add a wordlist as an array of strings in `words.js` as the existing 4 words provides.
- Import the array in line 1 of `app.js` as the 4 existing lists provides.
- Either: 
    1) Change variable `words` to equal the imported list via it's name in line 1
    2) Add the array to the `words` variable using the `...` (spread) operator to add it to the concatenated array to be executed with the rest.

#### Output
No support for concurrency, one by one to prevent rate limiting. On each successful response, the response will be logged to the console. Once every name in the array(s) have been processed, `output.txt` will be created with the results after filtering out the failures. 