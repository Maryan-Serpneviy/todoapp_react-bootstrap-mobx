import React from 'react'
import { Provider } from 'mobx-react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Courses from '~cn/Courses'
import Students from '~cn/Students'
import store from '~s'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <div className="App">
                    <Route path="/" component={Courses} exact />
                    <Route path="/students" component={Students} exact />
                </div>
            </Provider>
        </Router>
    )
}
