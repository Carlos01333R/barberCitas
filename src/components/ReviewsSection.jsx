import { Star } from "lucide-react";

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "John Doe",
    avatar: "modelo.png",
    rating: 5,
    comment:
      "¡El mejor corte de pelo que he tenido! El peluquero fue profesional y amable.",
  },
  {
    id: 2,
    name: "Mike Smith",
    avatar: "modelo.png",
    rating: 5,
    comment: "Gran ambiente y excelente servicio. ¡Seguro que volveré!",
  },
  {
    id: 3,
    name: "David Johnson",
    avatar: "modelo.png",
    rating: 4,
    comment:
      "Muy satisfecha con mi corte de pelo. El personal fue atento y competente.",
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
