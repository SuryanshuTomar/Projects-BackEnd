const Product = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
	const products = await Product.find({}).select("name price");
	res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res, next) => {
	const { featured, company, name, sort, fields } = req.query;
	const queryObject = {};

	// Search
	if (featured) {
		queryObject.featured = featured === "true" ? true : false;
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: "i" };
	}
	let result = Product.find(queryObject);

	// sort
	if (sort) {
		const sortString = sort.split(",").join(" ");
		result = result.sort(sortString);
	} else {
		result = result.sort("createdAt");
	}

	// select fields
	if (fields) {
		const fieldsString = fields.split(",").join(" ");
		result = result.select(fieldsString);
	}

	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
