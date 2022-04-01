import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";
// import Main from "./components/Main";
// import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";
import TodoList from "./components/TodoList";
import LoginForm from './components/Auth.js'
import axios from "axios";
import {HashRouter, BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'



const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}

class App extends React.Component {

    constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todo': [],
           'token': ''
       }
    }

    getData() {
        let headers = this.getHeader()

        axios
           .get('http://127.0.0.1:8000/api/users', {headers})
           .then(response => {
               const users = response.data

               this.setState(
               {
                   'users': users
               })
           })
           .catch(error => {
               console.log(error)
               this.setState({
                   'users': []
               })
        })

        axios
           .get('http://127.0.0.1:8000/api/projects', {headers})
           .then(response => {
               const projects = response.data

               this.setState(
               {
                   'projects': projects
               })
           }).catch(error => {
               console.log(error)
               this.setState({
                   'projects': []
               })
        })

        axios
           .get('http://127.0.0.1:8000/api/todo', {headers})
           .then(response => {
               const todo = response.data

               this.setState(
               {
                   'todo': todo
               })
           }).catch(error => {
               console.log(error)
               this.setState({
                   'todo': []
               })
           })
        }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.getData)
    }

    isAuth() {
        return !!this.state.token
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    getToken(login, password) {
        console.log(login, password)
        axios
            .post('http://127.0.0.1:8000/api-auth-token/', {'username': login, 'password': password})
            .then(response => {
                const token = response.data.token
                console.log(token)
                localStorage.setItem('token', token)
                this.setState({
                    'token': token
                }, this.getData)
            })
            .catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.getData)
    }

    render () {
       return (
           <div>
               <BrowserRouter>
                   <nav>
                       <li><Link to='/'>Users</Link></li>
                       <li><Link to='/projects'>Projects</Link></li>
                       <li><Link to='/todo'>Tasks</Link></li>
                        <li>
                            { this.isAuth() ? <button onClick={()=>this.logout()} >Logout</button> : <Link to='/login'>Login</Link> }
                        </li>
                   </nav>
                   <Routes>
                       {/*<Route exact path='/main' Main />*/}
                       <Route exact path='/' element = {<UserList users={this.state.users} />} />
                       <Route exact path='/projects' element = {<ProjectList project={this.state.projects} />} />
                       <Route exact path='/todo' element = {<TodoList todo={this.state.todo}/>} />
                       <Route exact path='/login' element = {<LoginForm getToken={(login, password) => this.getToken(login, password)} />} />
                       {/*<Route exact path='/footer' Footer />*/}
                       <Route path="*" element = {<NotFound />} />
                   </Routes>
               </BrowserRouter>
           </div>
       )
    }
    }

export default App;
