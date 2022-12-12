import ProductManager  from './ProductManager.js'
import express from 'express'


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080
const pManager = new ProductManager();

app.listen(PORT, () =>{
  console.log(`Listening on port ${PORT}`)
})
const productos = pManager.getProducts();

/* app.get('/products',(req,res) =>{
  res.json(productos)
}) */

app.get("/products",(req,res) =>{
  const { limit } = req.query;
  if(limit){
    const prodLimit = []
    for(let i = 0; i < limit; i++){
      prodLimit.push(productos[i])
    }
    res.json(prodLimit);
  } else {
    res.json(productos)
  }  
})


app.get('/products/:pid',(req,res) =>{
  const { pid } = req.params;
  const productoMostrar = productos.find((prod) => prod.id == pid)
  if(productoMostrar){
    res.json(productoMostrar)
  } else {
    res.send("<h1>Error, producto no encontrado por su ID</h1>")
  }
})

