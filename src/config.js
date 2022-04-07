import express from 'express'
import { engine }  from 'express-handlebars'
import bodyParser from 'body-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const _dirname = dirname(fileURLToPath(import.meta.url))

// Utilizar o diretório public para receber arquivos estáticos
app.use(express.static('./src/public'))

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
    app.set('views', './src/views')
    

// Body-Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    // Permite apenas que seja utilizados métodos iguais (Get, Post) e envia eles em um .json

export { app, _dirname }