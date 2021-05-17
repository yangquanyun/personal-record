/**
 *  浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果是引用类型，拷贝的就是内存地址
 *  所以如果其中一个对象改变了这个地址，就会影响到另一个对象
 */

// Object.assign()方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象
let obj1 = { person: {name: "kobe", age: 41},sports:'basketball' };
let obj2 = Object.assign({}, obj1);
obj2.person.name = "wade";
obj2.sports = 'football'
console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }

// 展开运算符——与Object.assign()的功能相同
let obj3 = { name: 'Kobe', address:{x:100,y:100}}
let obj4= {... obj1}
obj1.address.x = 200;
obj1.name = 'wade'
console.log('obj4',obj4) // obj4 { name: 'Kobe', address: { x: 200, y: 100 } }
