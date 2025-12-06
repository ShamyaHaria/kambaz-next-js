import { Nav, NavItem } from "react-bootstrap";
import Link from "next/link";

export default function TOC() {
  return (
    <Nav variant="pills" className="flex-column">
      <NavItem>
        <Link href="/Labs" className="nav-link">Labs</Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab1" className="nav-link">Lab 1</Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab2" className="nav-link">Lab 2</Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab3" className="nav-link">Lab 3</Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab4" className="nav-link">Lab 4</Link>
      </NavItem>
      <NavItem>
        <Link href="/Labs/Lab5" className="nav-link">Lab 5</Link>
      </NavItem>
      <NavItem>
        <Link href="/" className="nav-link">Kambaz</Link>
      </NavItem>
      <NavItem>
        <a href="https://github.com/ShamyaHaria" className="nav-link" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </NavItem>
    </Nav>
  );
}