import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import BaseLayout from "@/layouts/base";
import api from "@/utils/api";

export default function IndexPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("randomusers", { params: { page: "1", limit: "10" } })
      .then((res) => {
        // Access nested data structure: res.data.data contains the users array
        setData(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <BaseLayout>
        <div className="w-full pb-32">
          <section className="py-16 md:py-24 px-6 mb-12">
            <div className="container mx-auto max-w-7xl">
              <div className="w-64 h-12 bg-default-100 rounded-2xl shimmer-wrapper mb-4" />
              <div className="w-96 h-6 bg-default-50 rounded-xl shimmer-wrapper" />
            </div>
          </section>
          <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-[40px] border border-default-100"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-default-100 rounded-3xl shimmer-wrapper" />
                  <div className="flex-1">
                    <div className="w-full h-6 bg-default-100 rounded-lg shimmer-wrapper mb-2" />
                    <div className="w-1/2 h-4 bg-default-50 rounded-lg shimmer-wrapper" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-4 bg-default-50 rounded shimmer-wrapper" />
                  <div className="w-full h-4 bg-default-50 rounded shimmer-wrapper" />
                  <div className="w-full h-12 bg-default-100 rounded-2xl shimmer-wrapper mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </BaseLayout>
    );

  return (
    <BaseLayout>
      <div className="w-full pb-32">
        <section className="relative overflow-hidden py-16 md:py-24 px-6 mb-12">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFC72C]/5 rounded-full blur-[100px]" />
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1A1A1A]">
                Our <span className="text-[#9E2189]">Community</span>
              </h1>
              <p className="text-default-500 font-medium max-w-xl">
                Connecting artisans and enthusiasts from around the world.
                Explore our diverse user base and growing network.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4">
          {data.length > 0 ? (
            <motion.div
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {data.map((user: any, idx: number) => (
                <motion.div
                  key={user.id || idx}
                  className="group bg-white p-8 rounded-[40px] border border-default-100 hover:border-[#9E2189]/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500"
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        alt={user.name.first}
                        className="w-20 h-20 rounded-3xl object-cover ring-4 ring-default-50 group-hover:ring-[#9E2189]/10 transition-all duration-500"
                        src={user.picture.large}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-[#FFC72C] w-6 h-6 rounded-full border-4 border-white" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-[#1A1A1A] tracking-tight group-hover:text-[#9E2189] transition-colors">
                        {user.name.title} {user.name.first} {user.name.last}
                      </p>
                      <p className="text-sm font-bold text-[#9E2189]/60 uppercase tracking-widest mt-1">
                        {user.location.city}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-default-50 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-default-500 group-hover:text-default-800 transition-colors">
                      <span className="text-xs font-black uppercase tracking-widest w-16">
                        Email:
                      </span>
                      <span className="text-sm font-medium truncate">
                        {user.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-default-500 group-hover:text-default-800 transition-colors">
                      <span className="text-xs font-black uppercase tracking-widest w-16">
                        Origin:
                      </span>
                      <span className="text-sm font-medium">
                        {user.location.country}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button className="w-full h-12 bg-default-50 text-default-600 rounded-2xl text-xs font-black uppercase tracking-widest group-hover:bg-[#1A1A1A] group-hover:text-white transition-all duration-300">
                      View Profile
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-default-50 rounded-[40px] border-2 border-dashed border-default-200">
              <p className="text-default-400 font-bold uppercase tracking-[0.2em]">
                No members found
              </p>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
