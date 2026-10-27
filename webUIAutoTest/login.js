const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const firefox = require("selenium-webdriver/firefox");

describe("Login Test Case", function () {
    let driver;

    before(async function(){
         //Handle pop up message Google
        const options = new firefox.Options();
        // options.addArguments("--headless"); 
    
        driver = await new Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(options)
            .build();
            
    })

    beforeEach(async function () {
            driver.get("https://belajar-bareng.onrender.com/");
    })

    afterEach (async function (){
        await driver.manage().deleteAllCookies(); // delete cookies
        console.log("Test Complete");
    })

    after(async function (){ 
        if(driver){
            await driver.quit(); //reopen web
        }
        console.log("Driver close");
    })

    it("Successfully Login with username and password", async function () {
        this.timeout(50000);

        let usernameInput = await driver.findElement(
            By.xpath("//*[@data-testid='username-input']")
        );
        let passwordInput = await driver.findElement(
            By.xpath("//*[@data-testid='password-input']")
        );
        let loginButton = await driver.findElement(
            By.xpath("//*[@data-testid='login-button']")
        );

        await usernameInput.sendKeys("admin");
        await passwordInput.sendKeys("admin");
        await loginButton.click();

        this.timeout(3000);

        // Assertion 1 : Redirect to /users
        await driver.wait(until.urlContains("/users"), 10000);
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl.includes("/users"), true);
    })

    it("Login validation: wrong password", async function () {
        this.timeout(50000);
        let usernameInput = await driver.findElement(
            By.xpath("//*[@data-testid='username-input']")
        );
        let passwordInput = await driver.findElement(
            By.xpath("//*[@data-testid='password-input']")
        );
        let loginButton = await driver.findElement(
            By.xpath("//*[@data-testid='login-button']")
        );

        await usernameInput.sendKeys("admin");
        await passwordInput.sendKeys("testwrongpassword");
        await loginButton.click();

        // Assertion : login failed
       let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl.includes("/users"), false);

        let errorMessage = await driver.wait(
            until.elementLocated(                    
                By.xpath("//*[@data-testid='toast-item-error-login']")
            ),
            1000
        )

        await driver.wait(until.elementIsVisible(errorMessage), 10000);
            
        assert.strictEqual(
            await errorMessage.isDisplayed(),
            true            
        )
    })

})