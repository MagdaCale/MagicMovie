import axios from 'axios'
import express from 'express'

const app = express()
const PORT = 9090

app.set('view engine', 'ejs')

app.use((req, _, next)=>{
    console.log('neuer Request:', req.method, req.url)
    next()
})

app.use(express.static('./public'))

app.get('/:page', (req, res)=>{
    const page = req.params.page
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=05cec536de4bc83e37432c616c30a290&language=en-US&page=${page}`)
    .then(response => {
        const filme = response.data.results
        res.render('index', {filme})
    })
})

/* app.get('/user/:id', (req, res)=> {
    const id = req.params.id
    Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
    ]).then(([userResponse, todoResponse])=> {
        const user = userResponse.data
        const todos = todoResponse.data
        res.render('user', {user, todos})
    })
}) */

app.listen(PORT, () => console.log('Runs:', PORT))