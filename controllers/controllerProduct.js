import Container from "../containers/containerProduct";


const Product = new Container()

export const get = (req, res) => {
    const id = req.params.id;
    if (id) {
        Product.get(id)
            .then(products => {
                res.json(products);
            })
            .catch(err => {
                res.json(err);
            });
    }
    else{
        const user = req.user.username
        const saludo = `Bienvenido ${user}`
        Product.get()
            .then(products => {
                res.render("index", {products, saludo});
            })
            .catch(err => {
                res.json(err);
            });
    };
};

export const add = (req, res) => {
    const newProduct = {
        timestamp: Date.now(),
        nombre: req.body.name,
        descripcion: req.body.description,
        codigo: req.body.code,
        precio: req.body.price,
        foto: req.body.thumbnail,
        stock: req.body.stock,
    };
    Product.add(newProduct)
        .then(id => {
            res.json({ id: id }, res.redirect("/productos"));
        })
        .catch(err => {
            res.json(err);
        });
};

export const update = (req, res) => {
    const product = {
        timestamp: Date.now(),
        nombre: req.body.name,
        descripcion: req.body.description,
        codigo: req.body.code,
        precio: req.body.price,
        foto: req.body.thumbnail,
        stock: req.body.stock,
    };
    Product.update(req.params.id, product)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        });
};

export const Delete = (req, res) => {
    Product.delete( req.params.id)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        });
};