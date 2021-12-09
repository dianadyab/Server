const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "db.json"); //  path to the json file where we are storing our hash data
const MAX_TRY_COUNT = 5; //  Maximum numebr of attempts in case of failure

let readTryCount = 0; // hold the read try count
let writeTryCount = 0; // hold the write try count

const hash = {};

//  to get the value for a particular index
const get = (index) =>
  typeof hash[index] !== "undefined" ? hash[index] : null;

//  add a new value in a particular index
const set = (key, data) => {
  if (typeof hash[key] === "undefined") {
    hash[key] = {};
  }
  hash[key] = data;

  commitDB();
};

const update = (key, data) => {
  if (typeof hash[key] === "undefined") {
    hash[key] = {};
  }
  hash[key] = data;

  commitDB();
};

const readDB = () => {
  fs.readFile(dbFilePath, (err, data) => {
    try {
      //  validating data at the first time read
      data = data.toString();
      if (data) {
        data = JSON.parse(data);
      } else {
        data = {};
      }

      //  hash is a constant so we can't directly assign the data
      //  we can assign properties by the way
      for (key in data) {
        if (data.hasOwnProperty(key)) hash[key] = data[key]; // copies each property to the data object
      }
      readTryCount = 0;
    } catch (e) {
      throw e; //  bad data?
    }
  });
};

//  commiting the changes in the file
const commitDB = () => {
  const data = JSON.stringify(hash);
  const options = {
    encoding: "utf8",
  };

  fs.writeFile(dbFilePath, data, options, (err) => {
    if (err) {
      if (writeTryCount < MAX_TRY_COUNT) {
        setTimeout(commitDB, 1000); // let's try again 1s later
        writeTryCount++;
      } else {
        throw err; // raise the error
      }
    }

    // file is updated so nothing to do here...
    writeTryCount = 0;
  });
};

//  Read the file for the first time when the module loads
readDB();

//  exposing the getter and setters
exports.get = get;
exports.set = set;
exports.update = update;
