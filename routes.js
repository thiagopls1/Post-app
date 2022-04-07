import post from './src/models/db/tables.js'
import { app, _dirname } from './src/config.js'

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

export default app 