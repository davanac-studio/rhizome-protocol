import { NFTCertification } from "@/types/project";

export const createCertification = (tokenId: string): NFTCertification => ({
  contract: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
  tokenId,
  creationDate: new Date().toLocaleDateString('fr-FR'),
  blockchain: "Polygon",
  standard: "ERC-721",
  scanUrl: `https://polygonscan.com/token/${tokenId}`
});