import Link from 'next/link'
function Nav() {
  return (
    <nav>
        <ul>
            <li>
                <Link href = '/books'>Books</Link>
            </li>
            <li>
                <Link href = '/sales'>Sales</Link>
            </li>
            <li>
                <Link href = '/report'>Report</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nav