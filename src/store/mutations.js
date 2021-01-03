export default {
  // addCart (state, payload) {
  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //   // 2.product
  //   if (oldProduct) {
  //     oldProduct.count += 1
  //   } else {
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  // }
  AddCounter (state, payload) {
    payload.count++
  },
  AddToCart (state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}