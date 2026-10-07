import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { PageHero } from "@/components/sections/PageHero";
import { formatDate, posts, vieScolaireEnabled } from "@/lib/vie-scolaire";

export const metadata: Metadata = {
  title: "Vie scolaire",
  description: "Publications et moments de la vie scolaire à La Cité des Anges.",
  alternates: { canonical: "/vie-scolaire" },
};

export default function VieScolairePage() {
  if (!vieScolaireEnabled) notFound();

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Vie scolaire", href: "/vie-scolaire" }]}
        eyebrow="Vie scolaire"
        title="La vie de l’école"
        intro={<p>Les publications et les moments partagés par l’établissement.</p>}
      />
      <section className="section">
        <div className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post, i) => (
            <div key={post.slug} className="reveal" style={{ "--d": `${(i % 3) * 100}ms` } as React.CSSProperties}>
              <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
                {post.media && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.media.src}
                      alt={post.media.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <CalendarDays className="size-4 text-cyan-700" aria-hidden />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden>·</span>
                    {post.theme}
                  </p>
                  <h2 className="mt-3 text-xl font-extrabold">
                    <Link href={`/vie-scolaire/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-muted">{post.excerpt}</p>
                  <span className="link-arrow mt-6 self-start">
                    Lire la suite
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
      <ContactBlock />
    </>
  );
}
