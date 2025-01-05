export default function Layout({ children }: { children: React.ReactNode }) {
  return <article className="prose max-w-xl m-auto px-4 py-8">{children}</article>;
}
