import autocannon from 'autocannon'
import stream from 'stream'

function run(url){
    const buff = []
    const outputStream = new stream.PassThrough()

    const inst = autocannon({
        url,
        connections: 500,
        duration: 20
    })

    autocannon.track(inst, { outputStream })

    outputStream.on('data', (data) => buff.push(data))
    inst.on('done', () =>{
        process.stdout.write(Buffer.concat(buff))
    })
}

console.log('Benchmark on')

run('http://localhost:8080/info')