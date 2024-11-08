import { Quote } from "lucide-react";

interface TestimonialBlockProps {
  testimonial: string;
}

export const TestimonialBlock = ({ testimonial }: TestimonialBlockProps) => {
  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg">
      <div className="flex items-start gap-2 text-gray-600">
        <Quote className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
        <p className="italic text-gray-700">{testimonial}</p>
      </div>
    </div>
  );
};