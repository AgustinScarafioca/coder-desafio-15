process.on('exit', () => {
    console.log('Hilo terminado: ' + process.pid)
})

process.on('message', msg =>{
    const quantity = parseInt(msg)
    console.log('Hilo iniciado: ' + process.pid)
    const outNumbers = {}

    function randomNumber(){
        return parseInt(Math.random() * 1000) + 1
    }

    for(let i = 1; i <=  quantity; i++){
        const number = randomNumber()
        if(!outNumbers[number]){
            outNumbers[number] = 0
        }

        outNumbers[number]++
    }
    process.send(outNumbers)
    process.exit()
})

process.send('Readyyyyy')