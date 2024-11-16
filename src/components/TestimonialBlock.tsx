import { Quote } from "lucide-react";

interface TestimonialBlockProps {
  testimonial: string;
}

export const TestimonialBlock = ({ testimonial }: TestimonialBlockProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Témoignage commanditaire</h3>
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-start gap-4">
          <Quote className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <p className="italic text-gray-700">{testimonial}</p>
        </div>
      </div>
    </div>
  );
};