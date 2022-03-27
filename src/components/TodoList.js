import React from 'react'


const TodoItem = ({item}) => {
   return (
       <tr>
           <td>
               {item.project}
           </td>
           <td>
               {item.text}
           </td>
           <td>
               {item.creation_date}
           </td>
           <td>
               {item.update_date}
           </td>
           <td>
               {item.user}
           </td>
           <td>
               {item.is_active}
           </td>
       </tr>
   )
}


const TodoList = ({items}) => {
   return (
       <table>
           <th>
               Project
           </th>
           <th>
               Text
           </th>
           <th>
               Creation date
           </th>
           <th>
               Update date
           </th>
           <th>
               User
           </th>
           <th>
               Status
           </th>
           {items.map((item) => <TodoItem item={item} />)}
       </table>
   )
}

export default TodoList