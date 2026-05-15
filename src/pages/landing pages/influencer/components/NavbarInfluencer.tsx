const NavbarInfluencer = () => {
  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black px-4 sm:px-6 md:px-10 py-3 md:py-1">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/Logo.png"
            alt="Brilliant Brains AI"
            className="h-10 w-auto sm:h-12 md:h-18 object-contain"
          />
        </div>

        <button
          onClick={scrollToRegister}
          className="relative px-4 py-1.5 sm:px-5 sm:py-2 rounded-full
             text-xs sm:text-sm font-medium
             transition-all duration-200
             whitespace-nowrap group overflow-hidden"
          style={{
            border: "1px solid transparent",
            backgroundImage:
              "linear-gradient(#0f0f0f, #0f0f0f), linear-gradient(90deg, #F95A1B 0%, #E9DBB9 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          <span
            className="relative z-10 bg-gradient-to-r from-[#F95A1B] to-[#E9DBB9]
                   bg-clip-text text-transparent group-hover:text-black"
          >
            Apply to the Network →
          </span>

          <div
            className="absolute inset-0 bg-gradient-to-r from-[#F95A1B] to-[#E9DBB9]
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                  pointer-events-none"
          />
        </button>
      </div>
    </nav>
  );
};

export default NavbarInfluencer;
