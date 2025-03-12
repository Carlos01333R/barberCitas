// Sample gallery data
const galleryItems = [
  {
    id: 1,
    title: "Classic Fade",
    image:
      "https://i.pinimg.com/736x/86/98/92/8698925a0cf47389a82adaebd382f927.jpg",
  },
  {
    id: 2,
    title: "Modern Pompadour",
    image:
      "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_736,h_840/https://eighteeneight.com/san-diego-ca/wp-content/uploads/sites/2/2017/08/d0c8f7831452d965a0deb8e4da326c2b-male-hairstyles-latest-hairstyles.jpg",
  },
  {
    id: 3,
    title: "Textured Crop",
    image:
      "https://i.pinimg.com/736x/2c/33/e9/2c33e968bb9cee7e973462865f50a0fa.jpg",
  },
  {
    id: 4,
    title: "Slick Back",
    image:
      "https://lifestylebyps.com/cdn/shop/articles/Low-Drop-Fade-Line-Up-Shiny-Slicked-Back-Top_600x.jpg?v=1552375128",
  },
  {
    id: 5,
    title: "Buzz Cut",
    image:
      "https://cdn.shopify.com/s/files/1/0255/2417/4922/files/Man_with_a_Fresh_High_Skin_Fade_and_Confident_Smile_1_1024x1024.jpg?v=1729608386",
  },
  {
    id: 6,
    title: "Beard Styling",
    image:
      "https://cdn.shopify.com/s/files/1/0013/3536/1603/files/Short-And-Shaped.jpg?v=1603734407",
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Haircut Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="w-full bg-white rounded-lg overflow-hidden shadow-md "
            >
              <img
                alt={item.title}
                className="w-full h-64 object-cover "
                src={item.image || "/placeholder.svg"}
              />
              <div className="p-4">
                <p className="font-semibold text-lg">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
