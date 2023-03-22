let nameRepl
const alert=document.querySelector('.alert')
const container=document.querySelector('.container')
const singleTaskForm=document.querySelector('.single-task-form')
const editID=document.querySelector('.task-edit-id')
const editName=document.querySelector('.task-edit-name')
const editCompleted=document.querySelector('.task-edit-completed')
const editButton = document.querySelector('.task-edit-btn')
const params = window.location.search
const id = new URLSearchParams(params).get('id')


const showTask=async ()=>{
 try {
    const {data:{task}}=await axios.get(`api/v1/tasks/${id}`);
    const {_id:taskID,completed,name}=task;
    editID.textContent=taskID
    editName.value=name
    nameRepl=name
    if(completed){
      editCompleted.checked=true
    }
    
 } catch (error) {
    console.log(error);
 }
}

showTask()

singleTaskForm.addEventListener('submit',async (e)=>{
   e.preventDefault()
   try {
      
      const taskName=editName.value
      const taskCompleted=editCompleted.checked
      const {data:{task}}=await axios.patch(`api/v1/tasks/${id}`,{
         name:taskName,
         completed:taskCompleted
      })
   
   const { _id: taskID, completed, name } = task
   editID.textContent=taskID
   editName.value=name
   nameRepl=name
   if(completed){
      editCompleted.checked=true
   }

   alert.textContent = `task successfully edited`

   } catch (error) {
      console.log(error);
      alert.textContent = `there was an error..please try again`;
   }
   setTimeout(() => {
      alert.textContent=''
    }, 3000)
})