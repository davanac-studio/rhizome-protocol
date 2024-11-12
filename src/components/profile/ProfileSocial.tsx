import { Button } from "@/components/ui/button";
import { Mail, Globe, Twitter, Facebook, Linkedin } from "lucide-react";

export const ProfileSocial = () => {
  return (
    <div className="flex gap-3 mt-4">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Mail className="h-5 w-5 text-gray-600" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Globe className="h-5 w-5 text-gray-600" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Twitter className="h-5 w-5 text-gray-600" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Facebook className="h-5 w-5 text-gray-600" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Linkedin className="h-5 w-5 text-gray-600" />
      </Button>
    </div>
  );
};