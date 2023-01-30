import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '../styles/Nav.module.css';

function Nav() {
    const router = useRouter();
    const currentRoute = router.pathname;
    const nonActive = "block py-2 pl-3 pr-4 text-blue bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent hover:blue"
    const active = "block py-2 pl-3 pr-4 text-blue bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue dark:bg-blue-600 md:dark:bg-transparent "
  return (
   
<nav className="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
    <a href="/" className="flex items-center">
        <img  className="object-cover" src="../../public/Barnes-Noble-Logo.png" alt="Hypothetical Books Logo" />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Hypothetical Books</span>
    </a>
    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
            <Link href = '/books' className={currentRoute === '/books' ? active : nonActive}>Books</Link>
        </li>
        <li>
            <Link href = '/sales'className={currentRoute === '/sales' ? active : nonActive} aria-current="page">Sales</Link>
        </li>
        <li>
        <Link href = '/report'className={currentRoute === '/report' ? active : nonActive} aria-current="page">Reports</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Nav