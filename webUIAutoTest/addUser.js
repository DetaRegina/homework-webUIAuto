// const { Builder, By, until } = require("selenium-webdriver");
// const assert = require("assert");
// const firefox = require("selenium-webdriver/firefox");

// describe("Add User", function () {
//     let driver;

//     before(async function(){
//          //Handle pop up message Google
//         const options = new firefox.Options();
//         options.addArguments("--headless"); 
    
//         driver = await new Builder()
//             .forBrowser("firefox")
//             .setFirefoxOptions(options)
//             .build();
//             await driver.get("https://belajar-bareng.onrender.com/");
//     })

//     beforeEach (async function (){
//         //Login to the Website
//         this.timeout(50000);

//         let usernameInput = await driver.findElement(
//             By.xpath("//*[@data-testid='username-input']")
//         );
//         let passwordInput = await driver.findElement(
//             By.xpath("//*[@data-testid='password-input']")
//         );
//         let loginButton = await driver.findElement(
//             By.xpath("//*[@data-testid='login-button']")
//         );

//         await usernameInput.sendKeys("admin");
//         await passwordInput.sendKeys("admin");
//         await loginButton.click();

//         this.timeout(3000);
//     })
    
//     afterEach (async function (){
//         await driver.manage().deleteAllCookies(); // delete cookies
//         console.log("Test Complete");
//     })

//     after(async function (){ 
//         if(driver){
//             await driver.quit(); //reopen web
//         }
//         console.log("Driver close");
//     })

//     it("Successfully Add User with Username", async function () {
//         let addButton = await driver.findElement(
//             By.xpath("//*[@data-testid='add-button']")
//         );
//         await addButton.click();

//         // Assertion 1 : Redirect to /add
//         await driver.wait(until.urlContains("/add"), 10000);
//         let currentUrl = await driver.getCurrentUrl();
//         assert.strictEqual(currentUrl.includes("/users"), true);

//         // Assertion 2 : Successfully add new user
//         let usernameInput = await driver.findElement(
//             By.xpath("//*[@data-testid='username-input']")
//         );
//         let ageInput = await driver.findElement(
//             By.xpath("//*[@data-testid='age-input']")
//         );
//         let submitButton = await driver.findElement(
//             By.xpath("//*[@data-testid='submit-button']")
//         );

//         let uniqueName = "Deta " + Date.now();
//         await usernameInput.sendKeys(uniqueName);
//         await ageInput.sendKeys("22");
//         await submitButton.click();

//         let successMessage = await driver.wait(
//             until.elementLocated(                    
//                 By.id('success-added')
//             ),
//             1000
//         )
            
//         assert.strictEqual(
//             await successMessage.isDisplayed(),
//             true            
//         )
//         this.timeout(3000);
//     })
// })