import React from 'react'
import { Provider } from 'mobx-react'
import { DndProvider } from 'react-dnd'
import { isMobile } from 'react-device-detect'
import html5Backend from 'react-dnd-html5-backend'
import touchBackend from 'react-dnd-touch-backend'
import { HashRouter as Router, Route } from 'react-router-dom'
import Courses from '~cn/Courses'
import Students from '~cn/Students'
import store from '~s'
import './App.scss'

export default function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <DndProvider backend={isMobile ? touchBackend : html5Backend}>
                <Provider store={store}>
                    <div className="App">
                        <Route path="/" component={Courses} exact />
                        <Route path="/students" component={Students} exact />
                    </div>
                </Provider>
            </DndProvider>
        </Router>
    )
}
