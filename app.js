let list = [
    {
        title: '任务项一'
    },
    {
        title: '任务项二'
    }
];

let vm = new Vue({
    el: '.main',
    data: {
        list: list,
        todo: ''
    },
    methods: {
        addTodo(ev) {
            this.list.push({
                title: this.todo
            })
            this.todo = '';
        }
    }
})

