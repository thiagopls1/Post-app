import Sequelize from "sequelize"

const sequelize = new Sequelize('post_app', 'root', '', 
        {
        host: "localhost",  // Host
        dialect: "mysql",    // Qual SGBD estou usando
        logging: false // Pra não ficar aparecendo os comandos sql
        }
    )

sequelize.authenticate().then(() => {
    console.log("Conexão com o banco de dados feita com sucesso")
}).catch( (err) => {
    console.log(`Falha na conexão com o banco de dados: ${err}`)
})

export default sequelize