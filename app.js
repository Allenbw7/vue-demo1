// let list = [
//     {
//         title: '任务项一',
//         isChecked: false //状态false为未选中状态
//     },
//     {
//         title: '任务项二',
//         isChecked: true //状态true为选中状态
//     }
// ];

//设置&获取本地存储数据
let store = {
    save(key,value) {
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}

//从本地存储获取数据
let list = store.fetch('todo');

//筛选对应列表数据
let filter = {
    all(list) {
        return list;
    },
    finished(list) { 
        return list.filter(function(item) {
            return item.isChecked;
        })
    },
    unfinished(list) {
        return list.filter(function(item) {
            return !item.isChecked;
        })
    }
}

let vm = new Vue({
    el: '.main',
    data: {
        list: list,
        todo: '',
        editorTodos: '', //记录正在编辑的数据
        oldTitle: '', //记录正在编辑的数据的title
        visibility: 'all' //筛选数据列表
    },
    watch: {
        list: {
            handler: function() {
                store.save('todo',this.list);
            },
            deep: true
        }
    },
    computed: {
        //获取未选中条目数
        noCheckedLength() {
            return this.list.filter(function(item) {
                return !item.isChecked;
            }).length;
        },
        //筛选列表
        filteredList() {
            return filter[this.visibility] ? filter[this.visibility](this.list) : this.list;
        }
    },
    methods: {
        //添加任务
        addTodo(todo) {
            if(todo) {
                this.list.push({
                    title: this.todo,
                    isChecked: false
                });
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
        //双击编辑时鼠标聚焦
        'focus': {
            update(el,binding) {
                if(binding.value) {
                    el.focus();
                }
            }
        }
    }
})

//获取hash
function watchHash() {
    let hash = window.location.hash.slice(1);
    vm.visibility = hash;
}

//初始化hash
watchHash();

//监控hash
window.addEventListener('hashchange',watchHash);