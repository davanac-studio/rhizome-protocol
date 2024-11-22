import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface EmailLoginFormProps {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

export const EmailLoginForm = ({ email, password, onChange, loading }: EmailLoginFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </div>
  );
};