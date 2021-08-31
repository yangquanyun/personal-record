// 原型链继承
// function Animal () {
//     this.colors = ['black', 'white']
// }
//
// Animal.prototype.getColor = function () {
//     return this.colors;
// }
//
// function Dog () {}
// Dog.prototype = new Animal()
//
// let dog1 = new Dog();
// dog1.colors.push('brown');
// let dog2 = new Dog();
// console.log(dog2.colors)



// 借用构造函数实现继承
// function Animal (name) {
//     this.name = name;
//     this.getName = function () {
//         return this.name;
//     }
// }
//
// function Dog (name) {
//     Animal.call(this, name);
// }
//
// Dog.prototype = new Animal();


// 组合继承
// function Animal (name) {
//     this.name = name;
//     this.colors = ['black', 'white']
// }
//
// Animal.prototype.getName = function () {
//     return this.name;
// }
//
// function Dog(name, age) {
//     Animal.call(this, name);
//     this.age = age;
// }
//
// Dog.prototype = new Animal()
// Dog.prototype.constructor = Dog;
//
// let dog1 = new Dog('奶昔', 2)
// dog1.colors.push('brown')
// let dog2 = new Dog('哈赤',1)
// console.log(dog2)


// class实现继承
class Animal{
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name;
    }
}

class Dog extends Animal {
    constructor(name, age)  {
        super(name);
        this.age = age;
    }
}
