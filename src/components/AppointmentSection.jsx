import { Calendar, Clock, Scissors } from "lucide-react";

export default function AppointmentSection() {
  return (
    <section id="appointment" className="md:py-20 py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Book Your Appointment
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Calendar className="text-blue-600 h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Easy Scheduling</h4>
                  <p className="text-gray-600">
                    Book your appointment online anytime, anywhere
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Clock className="text-blue-600 h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">No Wait Times</h4>
                  <p className="text-gray-600">
                    Come at your scheduled time and get serviced right away
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Scissors className="text-blue-600 h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Expert Barbers</h4>
                  <p className="text-gray-600">
                    Choose from our team of skilled professionals
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl font-bold">Ready for a Fresh Look?</h3>
              <p className="text-gray-600 mb-6">
                Select a time that works for you
              </p>
              <a
                href="/appointment"
                className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Schedule Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
