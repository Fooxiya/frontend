import React from 'react';
import {useParams} from 'react-router-dom'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.link}
            </td>
        </tr>
    )
}


const UserProjectList = ({projects}) => {
    var {id} = useParams()
    var filteredProjects = projects.filter((project) => project.users.includes(parseInt(id)))

    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Link
            </th>
            {filteredProjects.map((book) => <ProjectItem project={project} />)}
        </table>
    )
}

export default UserProjectList