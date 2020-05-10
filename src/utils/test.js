// // function f1() {
// //   console.log('print')
// // }

// // function f2() {
// //   return f1()
// // }

// // console.log('print', f2())

// // const a = [{1: 1}, {2: 2}]
// // console.log('print', {...a})
// // const obj = Object.assign(...a)
// // console.log('print', obj)

// // function Person() {
// //   this.name = 'mike'
// //   this.age = 13
// // }
// // const person = new Person()
// // console.log('print', person)

// // function Person() {
// //   name = 'private mike'
// //   this.name = 'mike'
// //   return obj
// // }
// // Person.prototype.setName = function (name) {
// //   this.name = name
// // }

// // const person = new Person()
// // console.log('print', person.setName)

// // let str = '[ xxx | ] \n\n x'
// // str = str.replace(/[|]*\n/, '')
// // console.log('print', str)

// // const str = '1,2,3'
// // for (let i in str) {
// //   console.log('print', str[i])
// // }
// // const newStr = str.split(',')
// // console.log('print', newStr)
// // const resetStr = newStr.join(',')
// // console.log('print', resetStr)

// // function f1() {
// //   console.log('printf1')
// // }

// // function f2() {
// //   console.log('printf2')
// // }

// // f1.call(f2)

// // console.log('print', 3%2 === 0)

// // let str = '":,>.1212aa"'

// // console.log('print', str.toLocaleUpperCase())

// // console.log('print', /A|B/.test('B'))

// // console.log('print', str)

// // const a = [{id: 1}, {id: 1}, {id: 2}, {id: 2}]
// // let b = []
// // for (let i of a) {
// //   const isExist = b.find(j => j.id === i.id)
// //   if (!isExist)
// //     b.push(i)
// // }

// // console.log('print', b)

// // const f = {
// //   get count () {
// //     return 1
// //   }
// // }

// // const a = Object.assign({
// //   b: 2,
// // }, f)

// // console.log('print', a)

// // if (3 > 2)
// //   if (5 > 2)
// //     console.log('print')

// // (() => {
// //   const now = new Date()
// //   const Y = now.getFullYear()
// //   const M = now.getMonth() + 1
// //   const D = now.getDate()
// //   const h = now.getHours()
// //   const m = now.getMinutes()
// //   const s = now.getSeconds()

// //   console.log(`${Y}-${M}-${D} ${h}:${m}:${s}`)
// // })()

// class Animal {
//   type = null

//   constructor(type) {
//     this.type = type
//   }

//   walk() {
//     console.log(`walk`)
//   }
// }

// class Person extends Animal {
//   constructor() {
//     super(`person`)
//   }

//   run() {
//     console.log(this.type)
//   }
// }

// const john = new Person()
// john.run()

// a = []

// for (let i = 0; i < 10000; i++ ) {
//   a.push({ id: i })
// }

// const isExist = a.filter(i => i.id%2 === 0)
// console.log(isExist)

// console.log("Bad Authorization header format. Format is \"Authorization: Bearer <token>\"")

