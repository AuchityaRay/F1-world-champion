const db = require("../config/dbconfig");

const {
  buildsearchQuery,
  buildpaginationQuery,
  buildorderQuery,
} = require("../helpers/queryHelper");

async function getProductDetails(params) {
  const { searchBy, searchField, pageSize, currentPage, orderBy, orderDIR } =
    params;

  const searchQuery = buildsearchQuery(searchBy, searchField);
  const paginationQuery = buildpaginationQuery(pageSize, currentPage);
  const orderQuery = buildorderQuery(orderBy, orderDIR);

  const baseQuery = `
    SELECT p.productId, p.productName, p.productImageName,  p.productImageURL, p.brandName, 
    p.description, p.itemCode, p.itemType, p.currency,  p.currencyCode, p.saleAmount, p.brochureFileName, p.brochureFileURL,
   p.vendors, p.status, p.createdBy, p.created, p.updated, p.subCategoryId, p.categoryId, p.uomId, p.shippingMethodId,
  p.shippingTermsId, p.paymentTermsId, p.categoryName, p.subCategoryName, p.uomCode, p.uomDescription, p.organisationName
, p.organisationId, p.vendorInfo  FROM ProductV2 p  
LEFT JOIN Category c ON p.categoryId = c.categoryId 
LEFT JOIN Subcatgory sc ON p.subCategoryId = sc.subCategoryId
LEFT JOIN Uom u ON p.umoId = u.umoID
LEFT JOIN VendorsOrganizations vo ON p.vendorsOrganizationId = vo.vendorsOrganizationId
${searchQuery}
${orderQuery}
${paginationQuery};

`;
  const [rows] = await db.execute(
    baseQuery,
    Array(searchField.length).fill(`%${searchBy}%`)
  );
  return rows;
}

async function getProductCount(params) {
  const { searchBy, searchField } = params;
  const searchQuery = buildsearchQuery(searchBy, searchField);
  const countQuery = `SELECT COUNT(*) as totalCount FROM ProductV2 p ${searchQuery};`;
  const [result] = await db.execute(countQuery, Array(searchField.length).fill(`%${searchBy}%`));
  return result[0]= totalCount;
}


module.exports = {getProductDetails, getProductCount};