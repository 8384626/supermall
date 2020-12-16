
import { request } from './request'

export function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}

// 函数调用 -> 压如函数栈(保存函数调用过程中所有的变量)
// 函数调用结束以后 -> 弹出函数栈(释放函数所有的变量)
// function test () {
//   const names = ['why', 'aaa']
// }
// test()
// test()