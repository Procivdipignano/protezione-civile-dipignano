import { render, screen, act } from "@testing-library/react";
import Navbar from "@/components/Navbar";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Navbar", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { writable: true, value: 0 });
  });

  it("renders logo and all nav links", () => {
    render(<Navbar />);
    expect(screen.getByText(/PROTEZIONE CIVILE DIPIGNANO/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /volontariato/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /chi siamo/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contatti/i })).toBeInTheDocument();
  });

  it("starts transparent (no bg-pc-navy class)", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).not.toMatch(/bg-pc-navy/);
  });

  it("becomes solid after scroll past 80px", () => {
    render(<Navbar />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 100 });
      window.dispatchEvent(new Event("scroll"));
    });
    const nav = screen.getByRole("navigation");
    expect(nav.className).toMatch(/bg-pc-navy/);
  });
});
