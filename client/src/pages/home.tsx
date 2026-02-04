import DefaultLayout from "@/layouts/default";

export default function HomePage() {
  return (
    <DefaultLayout>
      <div className="w-full">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-primary">
              Welcome to MAVA
            </h1>
            <p className="text-lg md:text-xl text-center text-default-600 max-w-2xl">
              Discover premium beauty and lifestyle products handpicked for you
            </p>
            <button className="btn btn-primary btn-lg ">
              Shop Now
            </button>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-primary">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border border-default-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="bg-default-100 h-48 flex items-center justify-center">
                  <span className="text-default-400">Product Image {item}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-default-700">Premium Product {item}</h3>
                  <p className="text-sm text-default-500 mt-2">$99.99</p>
                  <button className="btn btn-primary w-full mt-4">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-primary">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Skincare", "Makeup", "Haircare", "Fragrance", "Bath & Body", "Home Decor"].map((category) => (
              <div
                key={category}
                className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition"
              >
                <p className="font-semibold text-default-700">{category}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
