/* eslint-disable @typescript-eslint/no-empty-interface */
import { signOut, useSession } from "next-auth/react";
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
        <div className="container my-3 ml-4 flex flex-row flex-wrap items-center">
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
              <ul className="mt-4 flex flex-col whitespace-nowrap rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
                <li>
                  <button
                    id="book-button"
                    aria-controls={openMenu ? "book-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClick}
                    className={nonActive}
                  >
                    Book Details
                  </button>
                  <Menu
                    id="book-menu"
                    anchorEl={openMenu ? anchorEl : null}
                    open={openMenu == "book-button"}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'book-button',
                      'className': "border-gray-700 bg-gray-700 px-8 dark:border-gray-700 dark:bg-gray-700",
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
                  <button
                    id="operations-button"
                    aria-controls={openMenu ? 'operations-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClick}
                    className={nonActive}
                  >
                    Operations
                  </button>
                  <Menu
                    id="operations-menu"
                    anchorEl={openMenu ? anchorEl : null}
                    open={openMenu == "operations-button"}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'operations-button',
                      'className': "border-gray-700 bg-gray-700 px-8 dark:border-gray-700 dark:bg-gray-700",
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
                  <button
                    id="tools-button"
                    aria-controls={openMenu ? "tools-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClick}
                    className={nonActive}
                  >
                    Tools
                  </button>
                  <Menu
                    id="tools-menu"
                    anchorEl={openMenu ? anchorEl : null}
                    open={openMenu == "tools-button"}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'tools-button',
                      'className': "border-gray-700 bg-gray-700 px-8 dark:border-gray-700 dark:bg-gray-700",
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
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="/scanner"
                        className={
                          /scanner\/*/.test(currentRoute) ? active : nonActive
                        }
                        aria-current="page"
                      >
                        Scanner
                      </Link>
                    </MenuItem>
                  </Menu>
                </li>
                {user ? <li>
                  <button
                    id="user-button"
                    aria-controls={openMenu ? "user-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClick}
                    className={nonActive}
                  >
                    {user.name}
                  </button>
                  <Menu
                    id="tools-menu"
                    anchorEl={openMenu ? anchorEl : null}
                    open={openMenu == "user-button"}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'user-button',
                      'className': "border-gray-700 bg-gray-700 px-8 dark:border-gray-700 dark:bg-gray-700",
                    }}
                  >
                    {user.role == "admin" ? <MenuItem onClick={handleClose}><Link
                      href="/users"
                      className={
                        /users\/*/.test(currentRoute) ? active : nonActive
                      }
                      aria-current="page"
                    >
                      User List
                    </Link></MenuItem>: null}
                    <MenuItem onClick={handleClose}><Link
                      href="/auth/changeMyPassword"
                      className={
                        /auth\/changeMyPassword\/*/.test(currentRoute) ? active : nonActive
                      }
                      aria-current="page"
                    >
                      Change Password
                    </Link></MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        onClick={() => {
                          void signOut();
                        }}

                        href="/"
                        aria-current="page"
                        className={nonActive}
                      >
                        Logout
                      </Link>
                    </MenuItem>
                  </Menu>
                </li>: null}
              </ul>
            </div>
          </div>
          : null}
      </div>
    </nav>
  );
}

export default Nav;
