"use client";
export default function Overlay() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#080808] text-[#f0f0f0] font-inter">

       <nav className="fixed top-8 w-full px-[6vw] flex justify-between text-[11px] tracking-[2px] z-20 pointer-events-none max-md:px-6 max-md:text-[9px]">
        <div>VIRTUE.LABS</div>
        <div>FLOWER GALLERY / ARCHIVE - 01</div>
      </nav>

       <section className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center">
          <h1 className="font-serif italic font-light leading-[0.85] text-[clamp(3.5rem,11vw,10rem)] text-white/90">
            ELEGANCE
          </h1>

          <div className="mt-6 flex justify-between gap-10 text-[10px] tracking-[4px] opacity-70 uppercase max-md:flex-col max-md:items-center max-md:gap-2">
            <p>01 - FLOWER SHADER</p>
            <p>NATURAL REFRACTION & WAVES</p>
          </div>
        </div>
      </section>

       <aside className="fixed right-8 bottom-1/2 rotate-90 origin-bottom-right text-[9px] tracking-[5px] opacity-80 z-20 pointer-events-none max-md:hidden">
        STROLL TO EXPLORE
      </aside>

    </main>
  )
}
