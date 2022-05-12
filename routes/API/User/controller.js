


/**
 * controller to create admin along with password info in admin object
 * @param {object} req
 * @param {object} res
 */
 module.exports.getHome = async (req, res) => {
	try {
		let homeData = [
            {
                productID : "ACHDKNZK",
                categoryID : "FRUITSID",
                thumbImage:"https://aaharmarket.com/product/apple-fruit/",
                arrayOfDetailsImage:['https://unsplash.com/photos/wXuzS9xR49M', 'https://unsplash.com/photos/wXuzS9xR49M'],
                totalAmountOfProduct:10,
                productName:"Apples",
                productVariety:"v1",
                mandiPrice:100,
                mountOfPerKg:90,
                productQty:50,
                rangeOfProductQty:[1,2,5,10,20],
                productQualty:"a1",
                descriptionOfProduct:"awesome apples",
                descriptionOfQuality:"this is a1 apples from farm",
                quantityUnit:"kg",
                productType:"FRUITS"
            },
            {
                productID : "ACHDASEFF",
                categoryID : "VEGID",
                thumbImage:"https://unsplash.com/photos/m1t-RJ1iCIU",
                arrayOfDetailsImage:['https://unsplash.com/photos/wpJzb1lX5Ac', 'https://unsplash.com/photos/4cEmT3AsoVc'],
                totalAmountOfProduct:10,
                productName:"Brocoli",
                productVariety:"v1",
                mandiPrice:100,
                mountOfPerKg:90,
                productQty:50,
                rangeOfProductQty:[1,2,5,10,20],
                productQualty:"a1",
                descriptionOfProduct:"awesome Brocoli",
                descriptionOfQuality:"this is a1 apples from farm",
                quantityUnit:"kg",
                productType:""
            }
        ]
		res.status(200).send({
			code: 3,
			status: true,
			message: "Product fetched sucessfully.",
			payload: homeData
		})
	} catch (e) {
		console.log(e)
		res.status(500).send({
			code: 3,
			status: false,
			message: "Error occured while fetching products",
			payload: e
		})
	}
}