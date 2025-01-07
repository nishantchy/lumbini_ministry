"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { menuItems } from "@/lib/menuItem";

export default function Navbar({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ne" : "en";
    Cookie.set("lang", newLang);
    router.refresh();
  };

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary shadow-md max-w-screen-2xl mx-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="text-white hover:text-white/90">
                          {item.title[lang as keyof typeof item.title]}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4">
                            {item.children.map((child) => (
                              <ListItem
                                key={child.id}
                                title={
                                  child.title[lang as keyof typeof child.title]
                                }
                                href={child.path}
                              />
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={item.path} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-white hover:text-white/90"
                          )}
                        >
                          {item.title[lang as keyof typeof item.title]}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* Language Toggle - Desktop
          <div className="hidden lg:block">
            <Button
              onClick={toggleLanguage}
              variant="secondary"
              className="font-medium"
            >
              {lang === "en" ? "नेपाली" : "English"}
            </Button>
          </div> */}
          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-primary p-0">
                <div className="flex flex-col space-y-4 p-4">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      {item.children ? (
                        <NavigationMenu>
                          <NavigationMenuList>
                            <NavigationMenuItem>
                              <NavigationMenuTrigger className="text-white hover:text-white/90">
                                {item.title[lang as keyof typeof item.title]}
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <ul className="grid gap-3 p-4">
                                  {item.children.map((child) => (
                                    <ListItem
                                      key={child.id}
                                      title={
                                        child.title[
                                          lang as keyof typeof child.title
                                        ]
                                      }
                                      href={child.path}
                                      onClick={() => setIsOpen(false)}
                                    />
                                  ))}
                                </ul>
                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>
                      ) : (
                        <Link
                          href={item.path}
                          className="block py-2 text-white hover:text-white/90"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title[lang as keyof typeof item.title]}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Language Toggle - Mobile */}
                  <Button
                    onClick={toggleLanguage}
                    variant="secondary"
                    className="w-full font-medium"
                  >
                    {lang === "en" ? "नेपाली" : "English"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
