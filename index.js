import express from 'express'
import { engine }  from 'express-handlebars'
import bodyParser from 'body-parser'
import post from './models/db/tables.js'

const app = express()

// Informando ao express que será utilizado o handlebar como template engine:
// Config
    // Template Engine
    app.engine('handlebars', engine())
    app.set('view engine', 'handlebars')
    app.set('views', './views')

// Body-Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    
// Rotas

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cadastro', (req, res) => {
    res.render("form")
})

// Formulários com o metodo post só podem passar os dados para essa rota assim:
app.post('/sucesso', (req, res) => {

    post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then( () => {
        res.redirect('/')
    }).catch( (erro) => {
        res.send(`Deu ruim alguma coisa aí =( : ${erro}`)
    })

})

app.listen(3000, () => {
    console.log(`Server running at port 3000`)
})