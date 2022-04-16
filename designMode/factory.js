/**
 * 工厂模式
 *  概念：工厂方法模式的实质是定义一个创建对象的接口，但让实现这个接口的类来决定实例化哪个类。工厂方法让类的实例化推迟到子类中进行
 */
class Dog{ // 实体类
    run () {
        console.log('Dog');
    }
}

class Cat { // 实体类
    run () {
        console.log('Cat');
    }
}

class Animal { // 工厂类
    constructor(name) {
        switch (name) {
            case 'Dog':
                return new Dog();
            case 'Cat':
                return new Cat();
            default:
                throw TypeError('class name wrong');
        }
    }
}

const cat = new Animal('Cat');
cat.run();
const dog = new Animal('Dog');
dog.run();

console.log('test')
