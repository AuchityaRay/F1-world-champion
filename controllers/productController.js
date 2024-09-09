const {getProductDetails, getProductCount} = require('../models/productModel');

async function fetchProductDetail(req, res) {
    const {
        currentPage = 1,
        pageSize = 10,
        orderBy = 'CreatedAt',
        orderDIR = 'desc',
        serachBy = '',
        serachField = [] ,
    } = req.query;

    try {

        const totalCount = await getProductCount ({serachBy, serachField});
        const totalPage = Math.ceil(totalCount / pageSize);

        const products = await getProductDetails ({
            currentPage: Number(currentPage),
            pageSize: Number(pageSize),
            orderBy,
            orderDIR,
            serachBy,
            serachField :serachField.length ? serachField : ['productName', 'description']

        });

        res.json ({
            currentPage: Number(currentPage),
            pageSize: Number(pageSize),
            totalPage,
            totalCount,
            data: products
        })
    } catch (error){
        res.status(500).json({error: "Error"});

    }
}

module.exports = {fetchProductDetail};