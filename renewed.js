
  
const puppeteer = require("puppeteer");
const fs = require("fs");
const tests = require("./tests.json");
const json2xls = require('json2xls');

// timestamp
var timestamp = Date.now();

// Today Date
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today_date = mm + "-" + dd + "-" + yyyy;

const JSONfolderName = `json/${today_date}`;
const ScrrenshotfolderName = `screenshots/${today_date}`;
try {
  if (!fs.existsSync(JSONfolderName)) {
    var folderCreated = fs.mkdirSync(JSONfolderName);
  }

  if (!fs.existsSync(ScrrenshotfolderName)) {
    var SSfolderCreated = fs.mkdirSync(ScrrenshotfolderName);
  }
} catch (err) {
  console.error(err);
}


const newsletter = async (url, callback) => {

  // const wsChromeEndpointUrl = 'ws://127.0.0.1:9222/devtools/browser/693bd78a-7239-4639-8adb-406ab22a95d3';
  //   const browser = await puppeteer.connect({
  //       browserWSEndpoint: wsChromeEndpointUrl
  //    });
 
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Get all the user types here
  const userTypes = await tests.map((user) => user.userType);

  console.log(userTypes.length);

  for (let i = 0; i < userTypes.length; i++) {
    let selectedUser = userTypes[i];

    const page = await browser.newPage();
    await page.goto(url, {
    waitUntil: 'load'
    });

  await page.evaluate(() => {
    document.getElementById("iFrame1").remove();
  });

  // Get the user data of selected user
  const userDetails = tests.find((user) => selectedUser === user.userType);

  // Wait for form to load
  await page.waitForSelector(".new-form-container");

  // Select Title
  await page.select("select[name='TITLE_PERSON']", userDetails.title);
  await page.keyboard.press("Tab");

  // Enter Name
  await page.type("input[name='nome']", userDetails.name);
  await page.keyboard.press("Tab"); 

  // Enter Surname
  await page.type("input[name='cognome']", userDetails.cognome);
  await page.keyboard.press("Tab");

  // Enter Email
  await page.type("input[name='Email']", userDetails.email);
  await page.keyboard.press("Tab");

  // Click on consents
  // 1st consent
  await page.$eval(userDetails.marketing, (elem) => elem.click());
  // 2nd consent
  await page.$eval(userDetails.profilazione, (elem) => elem.click());
  // 3rd consent
  await page.$eval(userDetails.terzi, (elem) => elem.click());

  // Click on submit button
  await page.click(".new-form-submit .submit-btn-nl");

  //capture response
  await page.on("response", async (response) => {
    if (response.url() == "https://s386478334.t.eloqua.com/e/f2") {
      //get request
      const req = response.request();
      //get formdata
      const formdata = req.postData();
      //convert to JSON
      // const urlParams = new URLSearchParams(formdata);
      console.log(formdata)

      const params = JSON.parse('{"' + formdata.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (
        key,
        value
      ) {
        return key === "" ? value : decodeURIComponent(value);
      });
      // const params = Object.fromEntries(urlParams);
      console.log(JSON.stringify(params));
      const jsonData = JSON.stringify(params)

      //save the file in array
      let jsonAllData = []
      jsonAllData.push(jsonData)
        
      if (jsonAllData.length > 4) {
        let xls = json2xls(jsonAllData);
        fs.writeFileSync('data1.xlsx', xls, 'binary');
      }
      //save data in JSON format
      //console.log(JSON.stringify(params));
      fs.writeFile(
       `${JSONfolderName}/${userDetails.userType}_${timestamp}.json`,
       JSON.stringify(params),
        "utf8",
         function (err) {
           if (err) return console.log(err);
         }
       );

       callback(params)
       //return params
    }
  });
//   // All screenshots to be saved in screenshots folder with userType as image name
  await page.screenshot({ path: `${ScrrenshotfolderName}/${userDetails.userType}_${timestamp}.png`, fullPage: true });
   console.log("Screenshot captured");

//   //check response status
  const finalResponse = await page.waitForResponse(
    (response) => response.url() === "https://s386478334.t.eloqua.com/e/f2" && response.status() === 200
 );

   
  }
  
  // Close browser
  browser.close();
  
  
}

module.exports = newsletter