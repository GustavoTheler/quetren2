const express = require("express");
const cors = require("cors");
const app = express();

// var corsOptions = {
//     origin: "http://localhost:9000"
// };

app.use(cors(corsOptions));   

app.use(express.json());    

app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
    res.json('asfasf')
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



const {Builder, By, Key, until} = require('selenium-webdriver');
// const { Options, firefox } = require('selenium-webdriver/firefox');
// const  options = new  Options().headless().setBinary(`${process.env.FIREFOX_BIN}`);
 
const webdriver = require('selenium-webdriver');

const getSelenium = async () => {
    try{
        let driver = await new Builder().forBrowser('firefox').build();
        await driver.get('https://webventas.sofse.gob.ar/');
        
        // origen
        let input_origen = await driver.findElement(By.id('origen-selectized'));
        await input_origen.click();
        
        let item_origen = await driver.findElement(By.css('.selectize-dropdown-content > .item[data-value="323"]'));
        await item_origen.click();

        // destino
        let input_destino = await driver.findElement(By.id('destino-selectized'));
        await input_destino.click();

        let item_destino = await driver.findElements(By.css('.selectize-dropdown-content > .item[data-value="398"]'));
        await item_destino[1].click();

        // fecha ida
        let input_ida = await driver.findElements(By.className('datepicker-button'));
        await input_ida[1].click();

        let next_month = await driver.findElement(By.css('#datepicker-calendar-fecha_ida > .datepicker-month-wrap > .datepicker-month-next'));
        await next_month.click();
        // await next_month.click();

        let dia = await driver.findElement(By.id('cell8-fecha_ida'));
        dia.click();

        // cantidad adultos
        let adultos = await driver.findElement(By.id('adulto'));
        adultos.click();

        let cantidad = await driver.findElement(By.css('select[name="busqueda[cantidad_pasajeros][adulto]"] > option[value="2"]'));
        cantidad.click();

        // btn buscar
        let btn_buscar = await driver.findElement(By.xpath("//*[text()='BUSCAR SERVICIOS']"));
        // console.log('btn buscar:', btn_buscar);
        btn_buscar.click();
        


        
        await driver.sleep(3000)

        // modal que se abre, cerrar
        let modal_cerrar = await driver.findElement(By.css('.modal-content > .modal_header_alerta > .close'));
        if (modal_cerrar){
            modal_cerrar.click();
        }

        let disponibles = await driver.findElements(By.css('.disponibles'));
        let no_disponibles = await driver.findElements(By.css('.texto_no_disponible'));
        console.log('DISPONIBLES:', disponibles.length/2);
        console.log('NO DISPONIBLES:', no_disponibles.length);
        

        driver.quit();
    }
    catch(e){
        // console.log('error', e);
        // driver.quit();
    }



}



// CRON
var cron = require('node-cron');

cron.schedule('*/1 * * * *', () => {
  console.log('Runn selenium');
  getSelenium();
});


