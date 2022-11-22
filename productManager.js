class ProductManager{

  constructor() {
    this.products = [];
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
    
    const productIdExists = this.getProductById(productToAdd.id);
    const productCodeExists = this.#getProductByCode(productToAdd.code);
    if(!productCodeExists){
      this.products.push(productToAdd);
      console.log(`Agregado ${productToAdd.title}`)
      //console.log(this.products)
    }else{console.log("No agregado, codigo ya existente")}
    
  }
  
  getProducts(){
    console.log(this.products);
  }

  getProductById(idProduct) {
    this.products.find((product) => {
      if(product.id == idProduct ){
        console.log(`Producto encontrado: ${product.title}`)
      } else {
        console.log("Producto no encontrado por su id")
        
      }
    })
  }

  #getMaxId() {
    let maxId = 0;
    this.products.map((p) => {
      if (p.id > maxId) maxId = p.id;
    });
    return maxId;
  }

}

const pManager = new ProductManager();


pManager.getProducts()
pManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
pManager.getProducts()
pManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
pManager.getProductById(1)
pManager.getProductById(2)