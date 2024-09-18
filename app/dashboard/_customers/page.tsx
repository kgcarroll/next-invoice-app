import { Metadata } from "next";

// Page specfic metadata overrides global.
export const metadata: Metadata = {
  title: "Customers",
};

export default function Page() {
  return <p>Customers Page</p>;
}
