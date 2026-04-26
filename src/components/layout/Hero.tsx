import Link from "next/link";


export default function Hero() {
    return(
        <section className = "flex flex-col items-center justify-center text-center py-32">
            <h1 className = "text-5xl font-bold mb-6">
                The Master Guidance of DSA (Data Structure's and Algoritm) from First Principles
            </h1>
            <p className = "text-gray-400 max-w-xl mb-8">
                Understand BFS, DFS, and time complexity visually — not just memorize patterns.
            </p>
            <div className="flex gap-4">
              <Link
                href="/learn"
                className="bg-primary px-6 py-3 rounded-lg hover:opacity-90 transition"
              >
                Start Learning
              </Link>
              <Link
                href="/visualize/bfs"
                className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-white/10 transition"
              >
                Explore Visualizer
              </Link>
            </div>
        </section>
    );
}