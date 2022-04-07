import Sequelize from "sequelize"
import sequelize from './db.js'

const post = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

post.sync({ force: false })

export default post