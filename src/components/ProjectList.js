import React from 'react'


const ProjectItem = ({item}) => {
   return (
       <tr>
           <td>
               {item.name}
           </td>
           <td>
               {item.link}
           </td>
           <td>
               {item.users}
           </td>
       </tr>
   )
}


const ProjectList = ({items}) => {
   return (
       <table>
           <th>
               Name
           </th>
           <th>
               Link
           </th>
           <th>
               Users
           </th>
           {items.map((item) => <ProjectItem item={item} />)}
       </table>
   )
}

export default ProjectList
