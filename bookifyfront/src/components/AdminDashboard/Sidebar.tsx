import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill}
 from 'react-icons/bs'
import { Link } from 'react-router-dom'

type SideBarProps = {
    openSidebarToggle: boolean,
    OpenSidebar: ()=>void,
}
function Sidebar({openSidebarToggle, OpenSidebar}: SideBarProps) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <Link to="/">
                    <BsCart3  className='icon_header'/> Bookify
                </Link>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/dashboard">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="allproducts">
                    <BsFillArchiveFill className='icon'/> Products
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="addproducts">
                    <BsFillGrid3X3GapFill className='icon'/> Create Products
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="alluser">
                    <BsPeopleFill className='icon'/> All users
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
