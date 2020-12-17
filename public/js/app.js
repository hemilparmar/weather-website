

// console.log('Client side javascripy file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console,log(data.error)
//         }
//         else{
//             console.log(data.forecastData.location)
//             console.log(data.location)
//         }
//     })

// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()//it will prevent the deuflt refresh of the page. page refresh karya vagar output aapshe
    const location = search.value
    // console.log(location)


    messageOne.textContent = 'Loading...'
    messageOne.textContent = ''
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    fetch(' /weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            }
            else {
                // console.log(data.forecastData)
                // console.log(data.location)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData.latitude
                messageThree.textContent = data.forecastData.longitude
                messageFour.textContent = data.forecastData.temperature_F

            }
        })

    })

})
