import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SignUpStep1Props {
  accountType: string;
  email: string;
  password: string;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  loading: boolean;
}

export const SignUpStep1 = ({ 
  accountType,
  email, 
  password, 
  onChange, 
  onNext, 
  loading 
}: SignUpStep1Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField label="Type de compte" required>
          <RadioGroup
            value={accountType}
            onValueChange={(value) => onChange('accountType', value)}
            className="grid grid-cols-2 gap-4 pt-2"
          >
            <div>
              <RadioGroupItem
                value="individuel"
                id="individuel"
                className="peer sr-only"
              />
              <Label
                htmlFor="individuel"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <span>Individuel</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem
                value="collectif"
                id="collectif"
                className="peer sr-only"
              />
              <Label
                htmlFor="collectif"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <span>Collectif</span>
              </Label>
            </div>
          </RadioGroup>
        </FormField>

        <FormField label="Email" required>
          <Input
            required
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="votre@email.com"
          />
        </FormField>

        <FormField label="Mot de passe" required>
          <Input
            required
            type="password"
            value={password}
            onChange={(e) => onChange('password', e.target.value)}
            placeholder="Votre mot de passe"
          />
        </FormField>
      </div>

      <Button 
        type="button" 
        className="w-full" 
        onClick={onNext}
        disabled={loading || !email || !password}
      >
        Continuer
      </Button>
    </div>
  );
};