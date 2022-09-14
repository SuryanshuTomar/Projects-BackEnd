const getAllProductsStatic = (req, res, next) => {
	res.status(200).json({ msg: "Products testing route" });
};

const getAllProducts = (req, res, next) => {
	res.status(200).json({ msg: "Products route" });
};

module.exports = { getAllProductsStatic, getAllProducts };
