import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Courses from '~cn/Courses'
import Students from '~cn/Students'
import store from '~s'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <Router>
            <Provider store={store}>
                <div className="App">
                    <Route path="/students" component={Courses} exact />
                    <Route path="/" component={Students} exact />
                </div>
            </Provider>
        </Router>
    )
}
