import fs from 'fs';

class ProductManager{

  constructor() {
    this.products = [];
    this.path = "productos.json";
  }
  
  #getProductByCode(codeProduct) {
    return this.products.find((product) => product.code === codeProduct);
  }
  addProduct(title,description,price,thumbnail,code,stock){

    const productToAdd = {
      id: this.#getMaxId() + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };
    if(fs.existsSync('productos.json')){
      this.#getProductos();
      this.products.push(productToAdd);
      fs.writeFileSync('productos.json',JSON.stringify(this.products))
    } else{
      this.products.push(productToAdd)
      fs.writeFileSync('productos.json',JSON.stringify(this.products))
    }
  }


  getProductById(idProduct) {
    const prods = JSON.parse(fs.readFileSync('productos.json','utf-8'));
    let product = prods.find((prod) => {
      return prod.id === idProduct
    })
    if(product){
      console.log(product)
    } else {
      console.log("Producto no encontrado por su id")
    }
  }

  updateProduct(idProduct,campoAct,act){

    let prodsToUpd = [];
    const prods = JSON.parse(fs.readFileSync('productos.json','utf-8'));
    let productToUpd = prods.find((prod) => {
      return prod.id === idProduct
    })
    if(productToUpd){
      console.log("Producto a actualizar: ", prodsToUpd)
      productToUpd[campoAct] = act;
      prods.filter((prod) => {
        if(prod.id != idProduct){
          prodsToUpd.push(prod)
        }
      })
      prodsToUpd.push(productToUpd);
      fs.writeFileSync('productos.json',JSON.stringify(prodsToUpd));
      let prodsUpd = JSON.parse(fs.readFileSync('productos.json','utf-8'));
      console.log("Productos actualizados: ", prodsUpd)
    } else{console.log("Producto no encontrado por su ID")}
  }

  deleteProduct(idProduct){
    let productsDelete = []
    const prods = JSON.parse(fs.readFileSync('productos.json','utf-8'));
    prods.filter((prod) => {
      if(prod.id != idProduct){
        productsDelete.push(prod)
      } else{console.log("Producto eliminado: ", prod)}
    })
    fs.unlinkSync('productos.json');
    fs.writeFileSync('productos.json',JSON.stringify(productsDelete))
  }
  

  #getMaxId() {
    let maxId = 0;
    this.products.map((p) => {
      if (p.id > maxId) maxId = p.id;
    });
    return maxId;
  }

  #getProductos(){
    const productos = JSON.parse(fs.readFileSync('productos.json','utf-8'));
    this.products = productos;
  }
  getProducts(){
    if(fs.existsSync('productos.json')){
      const productos = JSON.parse(fs.readFileSync('productos.json','utf-8'));
      this.products = productos;
      console.log(this.products)
    } else{
      this.#getProductos();
      console.log(this.products)
    }
    
  }

}

const pManager = new ProductManager();


//pManager.getProducts()
pManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
//pManager.getProducts()
//pManager.getProductById(1)
//pManager.getProductById(2)
pManager.updateProduct(1,"title","producto prueba 2")
pManager.addProduct('producto 2','otro',10,'xd','xd2',10)
pManager.deleteProduct(1)
pManager.getProducts()