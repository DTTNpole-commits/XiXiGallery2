import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_PASSWORD = "admin123";

export default function App() {
  const [artworks, setArtworks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Painting");
  const [image, setImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("artworks");
    if (saved) setArtworks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("artworks", JSON.stringify(artworks));
  }, [artworks]);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const addArtwork = () => {
    if (!title || !image) return;
    const newArt = {
      id: Date.now(),
      title,
      category,
      image,
    };
    setArtworks([newArt, ...artworks]);
    setTitle("");
    setImage(null);
  };

  const categories = ["All", ...new Set(artworks.map(a => a.category))];

  const filtered =
    activeCategory === "All"
      ? artworks
      : artworks.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-dark px-10 py-12">

      <header className="flex justify-between items-center mb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-pink to-brand-cyan bg-clip-text text-transparent">
          XiXi Gallery
        </h1>
        {!isAdmin ? (
          <button
            onClick={() => {
              const input = prompt("Enter Admin Password");
              if (input === ADMIN_PASSWORD) setIsAdmin(true);
            }}
            className="border px-4 py-2 hover:bg-white hover:text-black transition"
          >
            Admin
          </button>
        ) : (
          <button
            onClick={() => setIsAdmin(false)}
            className="border px-4 py-2"
          >
            Logout
          </button>
        )}
      </header>

      {isAdmin && (
        <div className="mb-16 p-6 border border-brand-pink">
          <div className="flex gap-4 flex-wrap">
            <input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-black border px-4 py-2"
            />
            <input
              placeholder="Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="bg-black border px-4 py-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => handleUpload(e.target.files[0])}
              className="text-sm"
            />
            <button
              onClick={addArtwork}
              className="bg-brand-pink px-6 py-2"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-10 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 border transition ${
              activeCategory === cat
                ? "bg-brand-cyan text-black"
                : "hover:bg-white hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <AnimatePresence>
          {filtered.map(art => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <div className="overflow-hidden border border-brand-cyan">
                <img
                  src={art.image}
                  className="group-hover:scale-110 transition duration-500"
                />
              </div>
              <h3 className="mt-4 text-lg">{art.title}</h3>
              <p className="text-sm text-gray-400">{art.category}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
