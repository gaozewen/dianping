export default {
  // 哪条记录开始，每一页多少条数据
  getProductList: (rowIndex, pageSize) => `/mock/products/likes.json?rowIndex=${rowIndex}&pageSize=${pageSize}`
}
