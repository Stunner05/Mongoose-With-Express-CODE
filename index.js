const express = require("express");
const app = express();
const path = require("path");

const methodOverride = require("method-override");

const Product = require("./models/products");

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

const mongoose = require("mongoose");
main()
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/farmStand", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// to parse obeject body
app.use(express.urlencoded({ extended: true }));

app.get("/dog", (req, res) => {
	res.send("woof");
});

const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", async (req, res) => {
	const { category } = req.query;
	if (category) {
		const products = await Product.find({ category});
		res.render("products/index", { products, category });
	} else {
		const products = await Product.find({});
		res.render("products/index", { products, category: "All" });
	}
	const products = await Product.find({});
	console.log(products);
	res.render("products/index", { products, categories });
});

// create new products
app.get("/products/new", async (req, res) => {
	res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
	// res.render("products/new");
	const newProduct = new Product(req.body);
	await newProduct.save();
	res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render("products/details", { product });
});

app.get("/products/:id/edit", async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true,
	});
	res.redirect(`/products/${product._id}`);
});

app.listen(3000, () => {
	console.log("listening on 3k");
});
