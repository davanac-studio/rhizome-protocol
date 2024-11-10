import { Card, CardContent } from "@/components/ui/card";

interface ProfileBioProps {
  bio?: string;
}

export const ProfileBio = ({ bio }: ProfileBioProps) => {
  if (!bio) return null;

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Bio</h2>
        <p className="text-gray-600 whitespace-pre-wrap">{bio}</p>
      </CardContent>
    </Card>
  );
};