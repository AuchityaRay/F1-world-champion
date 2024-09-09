// For Serach Query

function buildsearchQuery(searchBy, SearchField) {
  let searchQuery = "";
  if (searchBy && SearchField.length > 0) {
    const NewConditions = SearchField.map((field) => `${field} LIKE ? `).join(
      "OR"
    );
    searchQuery = `WHERE (${NewConditions}`;
  }
  return searchQuery;
}

// For Pagination
function buildpaginationQuery(pageSize, currentPage) {
  const limit = pageSize || 10;
  const OffLimit = (currentPage - 1) * limit;
  return `LIMIT ${limit} OFFSET ${OffLimit}`;
}

// For Order Query

function buildorderQuery(orderby, orderDir) {

    const orderDirection = orderDir.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
    return `ORDER BY ${orderby || 'createdAt'} ${orderDirection}`;
}

module.exports = { buildsearchQuery, buildpaginationQuery, buildorderQuery};
