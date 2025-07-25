// "use client";

// import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { BrainCircuit } from 'lucide-react'; // Importing a suitable icon from Lucide
// import Link from "next/link";
// import { useUser } from "@clerk/clerk-react";
// import { UserNav } from "./common/UserNav";

// export default function Header() {
//   // isLoaded helps prevent the UI from flickering while Clerk checks auth status
//   const { user, isLoaded } = useUser();

//   return (
//     <Disclosure as="nav" className="bg-white shadow-sm sticky top-0 z-50">
//       {({ open }) => (
//         <>
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
              
//               {/* Left side: New Logo and App Name */}
//               <div className="flex items-center">
//                 <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
//                   <BrainCircuit className="h-7 w-7 text-blue-600" />
//                   <span>InterPrep</span>
//                 </Link>
//               </div>

//               {/* Right side: Authentication buttons */}
//               <div className="hidden sm:flex sm:items-center sm:ml-6">
//                 {/* Show a loading state or nothing while Clerk is initializing */}
//                 {!isLoaded ? null : user ? (
//                   // User is signed in: Display the UserNav component
//                   <UserNav
//                     image={user?.imageUrl}
//                     name={user?.fullName!}
//                     email={user?.primaryEmailAddress?.emailAddress!}
//                   />
//                 ) : (
//                   // User is signed out: Display Sign In and Sign Up buttons
//                   <div className="flex items-center gap-4">
//                     <Link
//                       href="/sign-in"
//                       className="px-4 py-2 text-base font-medium text-gray-600 hover:text-blue-600 transition-colors"
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       href="/sign-up"
//                       className="px-4 py-2 rounded-md bg-blue-600 text-base font-medium text-white hover:bg-blue-700 transition-colors"
//                     >
//                       Sign Up
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* Mobile menu button (for the right side on small screens) */}
//               <div className="flex items-center sm:hidden">
//                 <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </DisclosureButton>
//               </div>

//             </div>
//           </div>

//           {/* Mobile Menu Panel */}
//           <DisclosurePanel className="sm:hidden border-t border-gray-200">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               {/* We show the same logic here for mobile */}
//               {!isLoaded ? null : user ? (
//                    <div className="px-2 py-2">
//                      <UserNav
//                         image={user?.imageUrl}
//                         name={user?.fullName!}
//                         email={user?.primaryEmailAddress?.emailAddress!}
//                       />
//                    </div>
//                 ) : (
//                   <div className="flex flex-col space-y-2">
//                      <Link
//                         href="/sign-in"
//                         className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
//                       >
//                         Sign In
//                       </Link>
//                       <Link
//                         href="/sign-up"
//                         className="block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white hover:bg-blue-700"
//                       >
//                         Sign Up
//                       </Link>
//                   </div>
//                 )}
//             </div>
//           </DisclosurePanel>
//         </>
//       )}
//     </Disclosure>
//   );
// }

// Location: apps/web/src/components/Header.tsx
"use client";

import { usePathname } from 'next/navigation';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BrainCircuit, FileText, BotMessageSquare } from 'lucide-react'; // Import all needed icons
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";
import { UserNav } from "./common/UserNav";

export default function Header() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  // The navigation items that will appear when a user is logged in
  const toolNavItems = [
    { name: 'Behavioral Prep', href: '/behavioral', icon: BotMessageSquare },
    { name: 'Technical Challenge', href: '/technical', icon: BrainCircuit },
    { name: 'Resume Review', href: '/resume', icon: FileText },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow-sm sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center">
              
              {/* Left side: Logo and App Name */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <BrainCircuit className="h-7 w-7 text-blue-600" />
                  <span>InterPrep</span>
                </Link>
              </div>

              {/* Center: Tool Navigation Tabs (only shown when logged in) */}
              <div className="hidden sm:flex flex-1 items-center justify-center">
                {user && (
                  <div className="flex items-center space-x-4">
                    {toolNavItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${
                            pathname === item.href
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Right side: Auth buttons or User Menu */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!isLoaded ? (
                    <div className="h-8 w-20 rounded-md bg-gray-200 animate-pulse" /> // Loading skeleton
                ) : user ? (
                  <UserNav
                    image={user.imageUrl}
                    name={user.fullName!}
                    email={user.primaryEmailAddress!.emailAddress!}
                  />
                ) : (
                  <div className="hidden sm:flex items-center gap-4">
                    <Link href="/sign-in" className="px-4 py-2 text-base font-medium text-gray-600 hover:text-blue-600">
                      Sign In
                    </Link>
                    <Link href="/sign-up" className="px-4 py-2 rounded-md bg-blue-600 text-base font-medium text-white hover:bg-blue-700">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden ml-auto">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
                </DisclosureButton>
              </div>

            </div>
          </div>

          {/* Mobile Menu Panel */}
          <DisclosurePanel className="sm:hidden border-t border-gray-200">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Show tool links in mobile menu ONLY if logged in */}
              {user && toolNavItems.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium
                    ${ pathname === item.href ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100' }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </DisclosureButton>
              ))}
              
              {/* Separator for mobile menu */}
              {user && <div className="border-t my-2" />}

              {/* Mobile Auth Buttons */}
              {!isLoaded ? null : !user && (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link href="/sign-in" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white hover:bg-blue-700">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}