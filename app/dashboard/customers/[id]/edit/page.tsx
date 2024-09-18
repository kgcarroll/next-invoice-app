import Form from "@/app/ui/customers/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {
  // fetchInvoiceById,
  fetchCustomerById,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Page specfic metadata overrides global.
export const metadata: Metadata = {
  title: "Edit Customers",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const customer = await fetchCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: `Edit Customer : ${customer.name}`,
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form customer={customer} />
    </main>
  );
}
