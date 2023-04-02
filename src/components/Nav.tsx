import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { CustomUser } from "../schema/user.schema";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

function Nav() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  const currentRoute = router.pathname;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<null | string>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpenMenu(event.currentTarget.id)
    console.log(event.currentTarget.id)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setOpenMenu(null)
  }
  const nonActive =
    "block py-2 pl-3 pr-4 text-blue bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent hover:blue";
  const active =
    "block py-2 pl-3 pr-4 text-blue bg-blue-700 rounded md:bg-transparent md:text-blue-400 md:p-0 md:dark:text-blue dark:bg-blue-600 md:dark:bg-transparent ";
  return (
    <nav className="border-gray-200 bg-white px-2 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex justify-between">
        <div className="container ml-4 my-3 flex flex-row flex-wrap items-center">
          <Link href="/" className="flex items-center">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Hypothetical Books
            </span>
          </Link>
        </div>
        {user ?
          <div>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-dropdown"
            >
              <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
                <li>
                  <Button
                    id="book-button"
                    aria-controls={openMenu ? "book-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClick}
                    className="block py-2 pl-3 pr-4 text-blue bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent hover:blue"
                  >
                    Book Details
                  </Button>
                  <Menu
                    id="book-menu"
                    anchorEl={openMenu ? anchorEl : null}
                    open={openMenu == "book-button"}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'book-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}><Link
                      href="/books"
                      className={/books\/*/.test(currentRoute) ? active : nonActive}
                    >
                      Books
                    </Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link
                      href="/authors"
                      className={
                        /authors\/*/.test(currentRoute) ? active : nonActive
                      }
                      aria-current="page"
                    >
                      Authors
                    </Link></MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="/genres"
                        className={
                          /genres\/*/.test(currentRoute) ? active : nonActive
                        }
                        aria-current="page"
                      >
                        Genres
                      </Link></MenuItem>
                  </Menu>
                </li>
                <li>
                  <Button
                    id="operations-button"
                    aria-controls={openMenu ? 'operations-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClick}
                    className="mt-2 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900"
                  >
                    Operations
                  </Button>
                  <Menu
                    id="operations-menu"
                    anchorEl={openMenu ? anchorEl : null}
                    open={openMenu == "operations-button"}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'operations-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}><Link
                      href="/vendors"
                      className={
                        /vendors\/*/.test(currentRoute) ? active : nonActive
                      }
                      aria-current="page"
                    >
                      Vendors
                    </Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link
                      href="/sales"
                      className={/sales\/*/.test(currentRoute) ? active : nonActive}
                      aria-current="page"
                    >
                      Sales
                    </Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link
                      href="/purchases"
                      className={
                        /purchases\/*/.test(currentRoute) ? active : nonActive
                      }
                      aria-current="page"
                    >
                      Purchases
                    </Link></MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="/buybacks"
                        className={
                          /buybacks\/*/.test(currentRoute) ? active : nonActive
                        }
                        aria-current="page"
                      >
                        Buybacks
                      </Link>
                    </MenuItem>
                  </Menu>
                </li>
                <li>
                  <Button
                    id="tools-button"
                    aria-controls={openMenu ? "tools-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClick}
                    className="mt-2 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900"
                  >
                    Tools
                  </Button>
                  <Menu
                    id="tools-menu"
                    anchorEl={openMenu ? anchorEl : null}
                    open={openMenu == "tools-button"}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'tools-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}><Link
                      href="/report"
                      className={
                        /report\/*/.test(currentRoute) ? active : nonActive
                      }
                      aria-current="page"
                    >
                      Reports
                    </Link></MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="/shelfcalculator"
                        className={
                          /shelfcalculator\/*/.test(currentRoute) ? active : nonActive
                        }
                        aria-current="page"
                      >
                        Calculator
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="/designer"
                        className={
                          /designer\/*/.test(currentRoute) ? active : nonActive
                        }
                        aria-current="page"
                      >
                        Designer
                      </Link>
                    </MenuItem>
                  </Menu>
                </li>
                {user && user.role == "admin" ?
                  <li>
                    <Link
                      href="/users"
                      className={
                        /user\/*/.test(currentRoute) ? active : nonActive
                      }
                      aria-current="page"
                    >
                      Users
                    </Link>
                  </li>
                  : null}
              </ul>
            </div>
          </div>
          : null}
      </div>
    </nav>
  );
}

export default Nav;
