export default {
  addCart (context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.product
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('AddCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('AddToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}