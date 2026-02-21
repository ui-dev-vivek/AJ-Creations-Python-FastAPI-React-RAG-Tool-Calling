export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
};

export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const magneticHover = {
    hover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
};

export const parallaxImage = {
    initial: { scale: 1.1, y: 0 },
    hover: {
        scale: 1.05,
        y: -10,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const zoomHover = {
    whileHover: { scale: 1.05, transition: { duration: 0.3 } },
};

export const productCardHover = {
    initial: { scale: 1 },
    hover: {
        scale: 1.02,
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(109, 76, 145, 0.1), 0 10px 10px -5px rgba(109, 76, 145, 0.04)",
        transition: { duration: 0.3, ease: "easeOut" }
    },
};

export const buttonTadka = {
    initial: { scale: 1 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
};

export const heroTextReveal = {
    initial: { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
    animate: {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        transition: { duration: 1, ease: "circOut", delay: 0.2 }
    },
};
