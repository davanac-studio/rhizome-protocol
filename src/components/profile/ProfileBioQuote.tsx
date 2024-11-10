import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

interface ProfileBioQuoteProps {
  bio?: string;
  quote?: string;
}

export const ProfileBioQuote = ({ bio, quote }: ProfileBioQuoteProps) => {
  if (!bio && !quote) return null;

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        {bio && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Bio</h3>
            <p className="text-gray-600">{bio}</p>
          </div>
        )}
        
        {quote && (
          <div className="flex gap-2">
            <QuoteIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <p className="text-gray-600 italic">{quote}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};