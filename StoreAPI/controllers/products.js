const Product = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
	const products = await Product.find({})
		.sort("name")
		.select("name price")
		.skip(11)
		.limit(4);
	res.status(200).json({ nbHits: products.length, products });
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

	// pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);

	const products = await result;
	res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProductsStatic, getAllProducts };
