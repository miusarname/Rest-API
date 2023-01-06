const express = require("express");
const morgan = require("morgan");
const app = express();

let productos = [
  {
    id: 1,
    name: "laptop",
    price: 1000,
  },
];

app.use(morgan("dev"));
app.use(express.json());

app.get("/products", (req, res) => {
  res.json(productos);
});

app.post("/products", (req, res) => {
  const newProducto = { ...req.body, id: productos.length + 1 };
  productos.push(newProducto);
  res.send(newProducto);
});

app.put("/products/:id", (req, res) => {
  const nuevaData = req.body;
  const productoEncontrado = productos.find((producto) => {
    return producto.id == req.params.id;
  });

  if (!productoEncontrado) {
    return res.status(404).json({
      message: "producto no encontrado ?!",
    });
  }
  productos = productos.map((producto) =>
    producto.id == req.params.id ? { ...producto, ...nuevaData } : producto
  );
 
  res.json({
    message: "producto actualizado...",
  });
});

app.delete("/products/:id", (req, res) => {
  console.log(req.params.id);
  const productoEncontrado = productos.find((producto) => {
    return producto.id == req.params.id;
  });

  if (!productoEncontrado) {
    res.status(404).json({
      message: "producto no encontrado ?!",
    });
  }
  productos = productos.filter(
    (product) => product.id !== parseInt(req.params.id)
  );
  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  console.log(req.params.id);
  const productoEncontrado = productos.find((producto) => {
    return producto.id == req.params.id;
  });

  if (!productoEncontrado) {
    res.status(404).json({
      message: "producto no encontrado ?!",
    });
  }

  console.log(productoEncontrado);
  res.json(productoEncontrado);
});

app.listen(3000);
console.log("server port 3000 ");
