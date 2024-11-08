import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";

interface SocialInputProps {
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SocialInput = ({
  icon: Icon,
  value,
  onChange,
  placeholder
}: SocialInputProps) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
    <Input
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="pl-10"
    />
  </div>
);