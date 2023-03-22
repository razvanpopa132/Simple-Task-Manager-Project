const taskForm=document.querySelector('.task-form')
const form=document.querySelector('.form')
const input=document.querySelector('.task-input')
const submitTask=document.querySelector('.submit')
const tasksContainer=document.querySelector('.tasks-container')
const task=document.querySelector('.task')
const deleteTask=document.querySelector('.task-btn-delete')
const editTask=document.querySelector('.task-btn-edit')


//getting and displaying the tasks
const showTasks= async ()=>{
    try {
        const{
            data:{tasks}
        }=await axios.get('/api/v1/tasks')

    if(tasks.length<1){
        tasksContainer.innerHTML=`<h1>No tasks in your list</h1>`
        return
    }
    
    const allTasks=tasks.map((task)=>{
        const {completed,_id:taskID,name}=task

        return `<div class="task ${completed}">
        <h2>${name}</h2>
        <a href="editTaskPage.html?id=${taskID}"  class="edit-link"><i class="fas fa-edit"></i></a>
        <button class="task-btn-delete" data-id="${taskID}"><i class="fas fa-trash"></i></button>
    </div>`
    }).join('')
    
    tasksContainer.innerHTML=allTasks
    console.log(allTasks);
    } catch (error) {
        tasksContainer.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
      console.log('there is an error');
    }

    
}


showTasks()

//delete task 
tasksContainer.addEventListener('click', async (e) => {
    const el = e.target
    console.log(el.parentElement.classList);
    if (el.parentElement.classList.contains('task-btn-delete')) {
      const id = el.parentElement.dataset.id
      console.log(id);
      try {
        await axios.delete(`/api/v1/tasks/${id}`)
        showTasks()
      } catch (error) {
        console.log(error)
      }
    }
    
  })


//submit task
taskForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const name=input.value
    console.log(name);
    try {
        await axios.post('/api/v1/tasks',{name})
        showTasks()
        input.value = ''
    } catch (error) {
        console.log(error)
    }
})





