import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

export default function Header() {
    const { header, logo, link, active } = styles
    return (
        <header className={header}>
            <div className={logo}>SevenCirclesOfHell</div>
            <div>
                <NavLink
                    className={link}
                    activeClassName={active}
                    to={process.env.PUBLIC_URL + '/'}
                    exact
                >
                    Courses
                </NavLink>

                <NavLink
                    className={link}
                    activeClassName={active}
                    to={process.env.PUBLIC_URL + '/students'}
                    exact
                >
                    Students
                </NavLink>
            </div>
        </header>
    )
}
