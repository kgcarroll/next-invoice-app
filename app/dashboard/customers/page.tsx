import Pagination from "@/app/ui/invoices/pagination";
// import Search from "@/app/ui/search";
import Table from "@/app/ui/customers/table";
// import { CreateInvoice } from "@/app/ui/invoices/buttons";
// import { lusitana } from "@/app/ui/fonts";
import { CustomerTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import {
  fetchInvoicesPages,
  fetchFilteredCustomers,
  fetchCustomers,
} from "@/app/lib/data";
import { Metadata } from "next";

// Page specfic metadata overrides global.
export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  const customerCount = await fetchCustomers();
  const filteredCustomers = await fetchFilteredCustomers(query);

  // console.log("total customers: ", customerCount.length);

  return (
    <div className="w-full">
      {/* <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateInvoice />
      </div> */}
      <Suspense key={query + currentPage} fallback={<CustomerTableSkeleton />}>
        <Table customers={filteredCustomers} />
      </Suspense>

      {customerCount.length > 6 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
