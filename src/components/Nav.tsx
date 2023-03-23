import Link from "next/link";
import { useRouter } from "next/router";

function Nav() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const nonActive =
    "block py-2 pl-3 pr-4 text-blue bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent hover:blue";
  const active =
    "block py-2 pl-3 pr-4 text-blue bg-blue-700 rounded md:bg-transparent md:text-blue-400 md:p-0 md:dark:text-blue dark:bg-blue-600 md:dark:bg-transparent ";
  return (
    <nav className="border-gray-200 bg-white px-2 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex justify-between">
        <div className="container ml-4 flex flex-row flex-wrap items-center">
          <Link href="/" className="flex items-center">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Hypothetical Books
            </span>
          </Link>
        </div>
        <div>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
              <li>
                <Link
                  href="/books"
                  className={/books\/*/.test(currentRoute) ? active : nonActive}
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/sales"
                  className={/sales\/*/.test(currentRoute) ? active : nonActive}
                  aria-current="page"
                >
                  Sales
                </Link>
              </li>
              <li>
                <Link
                  href="/purchases"
                  className={
                    /purchases\/*/.test(currentRoute) ? active : nonActive
                  }
                  aria-current="page"
                >
                  Purchases
                </Link>
              </li>
              <li>
                <Link
                  href="/buybacks"
                  className={
                    /buybacks\/*/.test(currentRoute) ? active : nonActive
                  }
                  aria-current="page"
                >
                  Buybacks
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className={
                    /vendors\/*/.test(currentRoute) ? active : nonActive
                  }
                  aria-current="page"
                >
                  Vendors
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className={
                    /authors\/*/.test(currentRoute) ? active : nonActive
                  }
                  aria-current="page"
                >
                  Authors
                </Link>
              </li>
              <li>
                <Link
                  href="/genres"
                  className={
                    /genres\/*/.test(currentRoute) ? active : nonActive
                  }
                  aria-current="page"
                >
                  Genres
                </Link>
              </li>
              <li>
                <Link
                  href="/shelfcalculator"
                  className={
                    /shelfcalculator\/*/.test(currentRoute) ? active : nonActive
                  }
                  aria-current="page"
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/designer"
                  className={
                    /designer\/*/.test(currentRoute) ? active : nonActive
                  }
                  aria-current="page"
                >
                  Designer
                </Link>
              </li>
              <li>
                <Link
                  href="/report"
                  className={
                    /report\/*/.test(currentRoute) ? active : nonActive
                  }
                  aria-current="page"
                >
                  Reports
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
