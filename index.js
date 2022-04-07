import express from 'express'
import { engine }  from 'express-handlebars'
import bodyParser from 'body-parser'
import post from './models/db/tables.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const _dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static('./public'))
// Informando ao express que será utilizado o handlebar como template engine:
// Config
    // Template Engine
    app.engine('handlebars', engine({defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowMethodsByDefault: true,
        }
    }))
    app.set('view engine', 'handlebars')
    app.set('views', './views')
    

// Body-Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    // Permite apenas que seja utilizados métodos iguais (Get, Post) e envia eles em um .json
    
// Rotas

app.get('/', (req, res) => {
    post.findAll({ order: [['id', 'DESC']]}).then((posts) => {
        res.render('home', {posts: posts})
    })
})

app.get('/cadastro', (req, res) => {
    res.render("form")
})

app.get('/editar/:id', (req, res) => {
    post.findAll({ where:{ 'id': req.params.id }}).then( (id) => {
        res.render("edit", {'id': id})
    }).catch( (erro) => {
        res.send(`Deu ruim ${erro}`)
    })
})

app.get('/deletar/:id', (req, res) => {
    post.findAll({ where:{ 'id': req.params.id }}).then( (id) => {
        res.render("delete", {'id': id})
    }).catch( (erro) => {
        res.send(`Deu ruim ${erro}`)
    })
})
// Formulários com o metodo post só podem passar os dados para essa rota assim:
app.post('/sucesso-cadastro', (req, res) => {

    post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then( () => {
        res.redirect('/')
    }).catch( (erro) => {
        res.send(`Deu ruim alguma coisa aí =( : ${erro}`)
    })

})

app.post('/sucesso-deletar/:id', (req, res) => {
    post.destroy({where: { 'id': req.params.id}}).then( () => {
        res.redirect("/")
    }).catch((erro) => {
        res.send(`Erro ao deletar: ${erro}`)
    })
})

app.post('/sucesso-editar/:id', (req, res) => {

    post.update(
    {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    },
    { where: { 'id': req.params.id }}).then( () => {
        res.redirect('/')
    }).catch( (erro) => {
        res.send(`Deu ruim alguma coisa: ${erro}`)
    })

})

app.listen(3000, () => {
    console.log(`Server running at port 3000`)
})