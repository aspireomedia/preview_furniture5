"use client";

import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { navLinks } from "@/data/store";

type HeaderProps = { cartCount: number; menuOpen: boolean; setMenuOpen: (open: boolean) => void; searchOpen: boolean; setSearchOpen: (open: boolean) => void };

export function Header({ cartCount, menuOpen, setMenuOpen, searchOpen, setSearchOpen }: HeaderProps) {
  return <header className="site-header">
    <div className="utility-bar"><div className="shell utility-inner"><span>Free shipping for orders over Rp 1.000.000</span><span className="utility-promise">Quality furniture for every space</span><div className="utility-links"><a href="#contact">Help Center</a><a href="#products">Track Order</a><a href="#about">Store Locator</a></div></div></div>
    <div className="shell header-row">
      <button className="icon-button mobile-only" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <a href="#home" className="brand" aria-label="Better Space home"><strong>Better Space</strong><span>FURNITURE FOR A BETTER LIVING.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>
      <div className="header-actions">
        <button className="search-trigger" aria-label="Search furniture" onClick={() => setSearchOpen(!searchOpen)}><Search size={18}/><span>Search furniture, room, or decor</span></button>
        <button className="icon-button desktop-only" aria-label="Your account"><UserRound /></button>
        <button className="icon-button desktop-only" aria-label="Your wishlist"><Heart /></button>
        <a className="icon-button cart-button" href="#products" aria-label={`Shopping cart, ${cartCount} products`}><ShoppingBag />{cartCount > 0 && <b>{cartCount}</b>}</a>
      </div>
    </div>
    {searchOpen && <div className="search-panel"><form className="shell search-form" role="search" onSubmit={(event) => { event.preventDefault(); document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" }); }}><label htmlFor="site-search">Search our collection</label><input id="site-search" placeholder="Try a sofa, dining table, or desk" autoFocus/><button>See products</button></form></div>}
    {menuOpen && <nav className="mobile-menu" aria-label="Mobile navigation">{navLinks.map(([label, href]) => <a href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
  </header>;
}