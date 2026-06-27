import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  it("renders all fields and submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/messaggio/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /invia/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /invia/i }));
    expect(await screen.findByText(/nome obbligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/email obbligatoria/i)).toBeInTheDocument();
    expect(screen.getByText(/messaggio obbligatorio/i)).toBeInTheDocument();
  });

  it("shows success message after valid submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/nome/i), "Mario Rossi");
    await user.type(screen.getByLabelText(/email/i), "mario@test.it");
    await user.type(screen.getByLabelText(/messaggio/i), "Vorrei diventare volontario");
    await user.click(screen.getByRole("button", { name: /invia/i }));
    expect(await screen.findByText(/messaggio inviato/i)).toBeInTheDocument();
  });
});
