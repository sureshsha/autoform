console.log("client side JS file loaded")
/*fetch("http://localhost:3000/weather?address=bengaluru").then((response)=>{
    response.json().then((data) => {
        if(data.error){
            console.log("please enter the valid location")
        } else {
            console.log(data)
        }
        
    })

})

const formData = document.querySelector('form')
const input = document.querySelector('input')

formData.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = input.value

    console.log(location)

})
*/
console.log('Client side javascript file is loaded!')

const Form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector("#msg-1")
const msg2 = document.querySelector("#msg-2")

Form.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = "Loading.... "
    msg2.textContent = ""

    const url = search.value

    fetch('/formdata?address=' + url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error
                msg2.textContent = ""
            } else {
           msg1.textContent = data
           //msg2.textContent = data.forecast
           console.log(data)
            }
        
        }).catch((error) => {
            console.log(error)
        })
    })
})

