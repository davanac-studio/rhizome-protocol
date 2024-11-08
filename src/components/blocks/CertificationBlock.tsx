import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NFTCertification } from "@/types/project";

interface CertificationBlockProps {
  certification: NFTCertification;
}

export const CertificationBlock = ({ certification }: CertificationBlockProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Certification NFT</h3>
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Contract:</p>
            <p className="font-mono">{certification.contract}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Token ID:</p>
            <p className="font-mono">{certification.tokenId}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-base font-medium">Metadata:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Date de création:</span>
              <span>{certification.creationDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Blockchain:</span>
              <span>{certification.blockchain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Standard:</span>
              <span>{certification.standard}</span>
            </div>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-4 flex items-center justify-center gap-2"
          onClick={() => window.open(certification.scanUrl, '_blank')}
        >
          <ExternalLink className="w-4 h-4" />
          Voir sur Polygonscan
        </Button>
      </div>
    </div>
  );
};