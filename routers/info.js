import { Router } from 'express'
import os from 'os'

const CPUs = os.cpus().length
const args = process.argv.slice(2)
const platform = process.platform
const version = process.version
const memory = process.memoryUsage().rss
const path = process.execPath
const id = process.pid
const folder = process.cwd()

const data = {
    cpus: `Cpus utilizados: ${CPUs}`,
    args: args,
    platform : `Os ${platform}`,
    version: `Node version ${version}`,
    memory: `Memory ussage ${memory}`,
    path: `Execution path: ${path}`,
    id: `Current id ${id}`,
    folder: `Current proyect folder ${folder}`
}

const info = Router()

info.get('/', (req, res) =>{
    res.json(data)
})

export default info