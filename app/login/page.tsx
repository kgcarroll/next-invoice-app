import { redirect } from "next/navigation";
import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import { Metadata } from "next";
import { signIn, auth, providerMap } from "@/auth";
import { AuthError } from "next-auth";

// Page specfic metadata overrides global.
export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const session = await auth();
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
        {Object.values(providerMap).map((provider) => (
          <form
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: props.searchParams?.callbackUrl ?? "",
                });
              } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  return redirect("/");
                }

                throw error;
              }
            }}
          >
            <button type="submit">
              <span>Sign in with {provider.name}</span>
            </button>
          </form>
        ))}
      </div>
    </main>
  );
}
