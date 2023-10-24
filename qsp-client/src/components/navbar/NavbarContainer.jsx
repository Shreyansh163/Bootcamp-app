import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const NavbarContainer = () => {
  return (
    <section className="bg-white h-[70px] drop-shadow-sm">
      <article className="bg-white h-[70px] flex items-center w-[90%] m-auto">
        <Logo />
        <Menu />
      </article>
    </section>
  );
}

export default NavbarContainer