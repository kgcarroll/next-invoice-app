"use client";
import { CustomerForm } from "@/app/lib/definitions";
import {
  // CheckIcon,
  // ClockIcon,
  // CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateCustomer, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function EditCustomerForm({
  customer,
}: {
  customer: CustomerForm;
}) {
  const initialState: State = { message: null, errors: {} };
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  const [state, formAction] = useActionState(
    updateCustomerWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={customer.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label
            htmlFor="customerId"
            className="mb-2 block text-sm font-medium"
          >
            Customer Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerId"
                name="customerId"
                type="text"
                // defaultValue={invoice.amount}
                placeholder="Enter customer name..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label
            htmlFor="customerEmail"
            className="mb-2 block text-sm font-medium"
          >
            Email Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerEmail"
                name="customerEmail"
                type="text"
                // defaultValue={invoice.amount}
                placeholder="Enter customer name..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Customer</Button>
      </div>
    </form>
  );
}
