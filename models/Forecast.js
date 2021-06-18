class Forecast{

    constructor(date,temperature,windKPH,pressure,humidity,condition,icon){
        this.date = this.dateFormat(date);
        this.temperature = temperature;
        this.windKPH = windKPH;
        this.pressure = pressure;
        this.humidity = humidity;
        this.condition = condition;
        this.icon = icon;
    }

    dateFormat = (date)=>{
        const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: '2-digit', minute: '2-digit'};
        let today  = new Date(date);
        return today.toLocaleDateString('es-MX',options);
    }

}

export default Forecast;