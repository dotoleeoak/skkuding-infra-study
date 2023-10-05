import fs from 'fs'
import os from 'os'
import { Router } from 'express'

const router = Router()

if (!fs.existsSync('user.json')) {
  fs.writeFileSync('user.json', '[]')
}

router.get('/', (req, res) => {
  const html = fs.readFileSync('index.html', 'utf-8')
  res.send(html)
})

router.post('/signup', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email
  const json = fs.readFileSync('user.json', 'utf-8')
  const users = JSON.parse(json)
  users.push({ username, password, email })
  fs.writeFileSync('user.json', JSON.stringify(users))
  res.status(201).send('signup success')
})

router.post('/login', (req, res) => {
  console.log(req.body)
  const username = req.body.username
  const password = req.body.password
  const json = fs.readFileSync('user.json', 'utf-8')
  const users = JSON.parse(json)
  const user = users.find((u) => u.username === username)
  if (!user || user.password !== password) {
    res.status(401).send('login failed')
  }
  res.status(200).send('login success')
})

router.get('/users', (req, res) => {
  const json = fs.readFileSync('user.json', 'utf-8')
  const data = JSON.parse(json)
  const users = data.map((user) => {
    const { password, ...safeUser } = user
    return safeUser
  })
  res.send(users)
})

router.get('/os', (req, res) => {
  const data = {
    type: os.type(),
    hostname: os.hostname(),
    cpu_num: os.cpus().length,
    total_mem: `${os.totalmem() / 1024 / 1024} MB`
  }
  res.send(data)
})

export { router }
