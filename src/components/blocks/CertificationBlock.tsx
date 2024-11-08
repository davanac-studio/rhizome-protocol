import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NFTCertification } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CertificationBlockProps {
  certification?: NFTCertification;
}

export const CertificationBlock = ({ certification }: CertificationBlockProps) => {
  if (!certification) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Certification NFT</h3>
          </div>
          <p className="text-gray-500">
            Ce projet ne dispose pas encore de certification NFT.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Certification NFT</h3>
          <Badge variant="secondary">Certifié</Badge>
        </div>

        <div className="flex justify-center">
          <img 
            src="/nft-certificate.png" 
            alt="NFT Certificate" 
            className="w-96 h-auto shadow-lg rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Contract:</h4>
              <p className="font-mono text-sm bg-gray-50 p-2 rounded">{certification.contract}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Token ID:</h4>
              <p className="font-mono text-sm bg-gray-50 p-2 rounded">{certification.tokenId}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Metadata:</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Date de création:</span>
                <span>{certification.creationDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Blockchain:</span>
                <span>{certification.blockchain}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Standard:</span>
                <span>{certification.standard}</span>
              </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 text-blue-500 hover:text-blue-600"
            onClick={() => window.open(certification.scanUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            Voir sur Polygonscan
          </Button>
        </div>
      </div>
    </Card>
  );
};