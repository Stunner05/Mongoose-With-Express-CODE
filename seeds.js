const Product = require("./models/products");

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

// const p = new Product({
//     name: 'grapes',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save().then(p => {
//     console.log(p)
// })
// .catch(err => console.log(err))

const seedProducts = [
	{
		name: "Fairy Eggplant",
		price: 1.0,
		category: "vegetable",
	},
	{
		name: "Organic Goddess Melon",
		price: 4.99,
		category: "fruit",
	},
	{
		name: "Organic Mini Seedless Watermelon",
		price: 3.99,
		category: "fruit",
	},
	{
		name: "Organic Celery",
		price: 1.5,
		category: "vegetable",
	},
	{
		name: "Chocolate Whole Milk",
		price: 2.69,
		category: "dairy",
	},
];

Product.insertMany(seedProducts)
    .then(
    res => console.log(res))
    .catch(e => {
        console.log(e)
    })