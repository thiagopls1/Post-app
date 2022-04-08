import post from './database/tables.js'


const service = {

     renderAllPosts(req, res){
        post.findAll({ order: [['id', 'DESC']]}).then((posts) => {
            res.render('home', {posts: posts})
        })
    },

     renderUpdatePost(req, res){
        post.findAll({ where:{ 'id': req.params.id }}).then( (id) => {
            res.render("edit", {'id': id})
        }).catch( (erro) => {
            res.send(`Deu ruim ${erro}`)
        })
    },

     renderDeletePost(req, res){
        post.findAll({ where:{ 'id': req.params.id }}).then( (id) => {
            res.render("delete", {'id': id})
        }).catch( (erro) => {
            res.send(`Deu ruim ${erro}`)
        })
    },

     createPost(req, res){

        post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then( () => {
            res.redirect('/')
        }).catch( (erro) => {
            res.send(`Deu ruim alguma coisa aí =( : ${erro}`)
        })

    },

     deletePost(req, res){

        post.destroy({where: { 'id': req.params.id}}).then( () => {
            res.redirect("/")
        }).catch((erro) => {
            res.send(`Erro ao deletar: ${erro}`)
        })

    },

     updatePost(req, res){

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

    }
    
}
   

export default service