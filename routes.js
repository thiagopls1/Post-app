import { app, _dirname } from './src/config.js'
import service from './src/service.js'

// Rotas GET

app.get('/', (req, res) => {service.renderAllPosts(req, res)})

app.get('/cadastro', (req, res) => {res.render("form")})

app.get('/editar/:id', (req, res) => {service.renderUpdatePost(req, res)})

app.get('/deletar/:id', (req, res) => {service.renderDeletePost(req, res)})

// Rotas POST

// Formulários com o metodo post só podem passar os dados em uma rota post
app.post('/sucesso-cadastro', (req, res) => {service.createPost(req, res)})

app.post('/sucesso-deletar/:id', (req, res) => {service.deletePost(req, res)})

app.post('/sucesso-editar/:id', (req, res) => {service.updatePost( req, res)})

export default app 