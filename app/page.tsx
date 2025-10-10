import { Notes } from "@/components/notes";

export default function Page() {
  return (
    <>
      <div className="lg:hidden">
        <div className="flex flex-col items-center justify-center h-screen px-4">
          <h1 className="text-2xl font-bold mb-5">Womp Womp</h1>
          <p className="text-sm text-center">
            If you are reading this, try this app on a desktop
          </p>
        </div>
      </div>
      <div className="hidden lg:block">
        <Notes />
      </div>
    </>
  );
}
