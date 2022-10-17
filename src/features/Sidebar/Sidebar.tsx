import { NavLink } from 'react-router-dom'

import { SidebarItem } from './SidebarItem/SidebarItem'
type NavbarType = {

}
export const Sidebar = (props: NavbarType) => {
    return (
        <ul >
            <NavLink to='/profile'>
                <SidebarItem title='Профиль' />
            </NavLink>
            <NavLink to='/dialogs'>
                <SidebarItem title='Сообщения' />
            </NavLink>
            <NavLink to='/users'>
                <SidebarItem title='Пользователи' />
            </NavLink>
            <NavLink to='/news'>
                <SidebarItem title='Новости' />
            </NavLink>
            <NavLink to='/music'>
                <SidebarItem title='Музыки' />
            </NavLink>
            <NavLink to='/settings'>
                <SidebarItem title='Настройки' />
            </NavLink>
            <div style={{ marginTop: '30px' }}>
                Best friends (Добавить авки)
            </div>
        </ul>
    )
}
