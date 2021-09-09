import Vue from 'vue'
Vue.directive('debounce', {
    bind: (el, binding) => {
        let debounceTime = binding.value; // 防抖时间
        // 用户若不设置防抖时间，默认为2s
        if(!debounceTime) {
            debounceTime = 2000;
        }
        let callbackFun;
        el.addEventListener('click', event => {
            if (!callbackFun) { // 第一次执行
                callbackFun = setTimeout(() => {
                    callbackFun = null;
                }, debounceTime);
            } else {
                event && event.stopImmediatePropagation();
            }
        }, true);
    }
});

// DEMO
// <button @click="sayHello" v-debounce>提交</button>
// sayHello() {
//     console.log('Hello!')
// }
