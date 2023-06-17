document.querySelector ('form').addEventListener('submit', async (event)=> {
    event.preventDefault()
    let input = document.getElementById('searchInput').value
    if (input !== '') {
        clearInfo()
        ShowMensage('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f0ac0e8159f59971b13bce4f5417d52e&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if (json.cod === 200) {
            ShowMensage('')
            document.querySelector('.titulo').innerHTML = `${json.name}, ${json.sys.country}`
            document.querySelector('.tempInfo').innerHTML = (json.main.temp).toFixed(0) + '<sup>ºC</sup>'
            document.querySelector('.ventoInfo').innerHTML = json.wind.speed + ' <span>km/h</span>'
            document.querySelector('.ventoPonto').style.transform = `rotate(${json.wind.deg-90}deg)`
            document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
            document.querySelector('.resultado').style.display = 'block'

        } else {
            clearInfo()
            ShowMensage ('Localização não encontrada...')
        }
    } else {
        clearInfo()
    }
})

function clearInfo() {
    document.querySelector('.resultado').style.display = 'none' 
}

function ShowMensage (msg) {
    document.querySelector ('.aviso').innerHTML = msg
} 