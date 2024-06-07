const express = require("express")
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

const port = 3001



const Dicionario = mongoose.model('Dicionario', {
    palavra: String,
    traducao: String,
    significado: String
  
})

app.get('/get', async (req, res) => {
    const dicionario = await Dicionario.find()
    return res.send(dicionario)
})

app.delete("/delete/:id", async (req, res) => {
    const dicionario = await Dicionario.findByIdAndDelete(req.params.id)
    return res.send(dicionario)
})

app.put("/update/:id", async (req, res) => {
    const dicionario = await Dicionario.findByIdAndUpdate(req.params.id, {
        palavra: req.body.palavra,
        traducao: req.body.traducao,
        significado: req.body.significado
    })
    return res.send(dicionario)

})

app.post("/create", async (req, res) => {

    try {
        const dicionario = await Dicionario.create(req.body)
        return res.status(200).json(dicionario);


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message })
    }

})





app.listen(port, () => {
    mongoose.connect('mongodb+srv://Marilia:8Ytx91FPc5muxcwy@marilia.wliyygm.mongodb.net/?retryWrites=true&w=majority&appName=marilia')
    console.log(`Rodando na porta ${port}`)
})