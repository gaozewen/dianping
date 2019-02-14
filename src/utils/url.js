export default class UrlUtil {
  // 哪条记录开始，每一页多少条数据
  static getProductList = (rowIndex, pageSize) => `/mock/products/likes.json?rowIndex=${rowIndex}&pageSize=${pageSize}`
}
