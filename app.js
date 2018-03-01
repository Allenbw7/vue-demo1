let list = [
    {
        title: '任务项一',
        isChecked: false //状态false为未选中状态
    },
    {
        title: '任务项二',
        isChecked: true //状态true为选中状态
    }
];

let vm = new Vue({
    el: '.main',
    data: {
        list: list,
        todo: '',
        editorTodos: '',
        oldTitle: ''
    },
    computed: {
        noCheckedLength() {
            return this.list.filter(function(item) {
                return !item.isChecked;
            }).length;
        }
    },
    methods: {
        //添加任务
        addTodo(todo) {
            if(todo) {
                this.list.push({
                    title: this.todo,
                    isChecked: false
                })
                this.todo = '';
            }
        },
        //删除任务
        deleteTodo(todo) {
            let index = this.list.indexOf(todo);
            this.list.splice(index,1);
        },
        //编辑任务
        editorTodo(todo) {
            this.oldTitle = todo.title;
            this.editorTodos = todo;
        },
        //编辑成功
        editorTodoed() {
            this.editorTodos = '';
        },
        //取消编辑
        cancelTodo(todo) {
            todo.title = this.oldTitle;
            this.editorTodos = '';
        }
    },
    directives: {
        'focus': {
            update(el,binding) {
                if(binding.value) {
                    el.focus();
                }
            }
        }
    }
})

